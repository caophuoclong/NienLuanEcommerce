import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegistrationDTO } from './dto/registration.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AuthEntity } from '../database/entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { checkPassword, hashPassword } from 'src/utils/password';
import { ConfigService } from '@nestjs/config';
import { RolesEnum } from 'src/enum/roles.enum';
import { CustomerService } from 'src/customer/customer.service';
import { RedisClientType } from '@redis/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    private readonly configService: ConfigService,
    private readonly customerService: CustomerService,
    @Inject('CACHE_MODULE')
    private readonly cacheService: RedisClientType,
  ) {}
  async registration(dto: RegistrationDTO) {
    try {
      const { firstName, lastName, middleName, shop_name, dob, ...authDTO } =
        dto;
      const existAuth = await this.authRepository.findOne({
        where: [{ username: authDTO.username }, { email: authDTO.email }],
      });
      if (existAuth) {
        if (existAuth.username === authDTO.username) {
          throw new BadRequestException({
            name: 'username',
            message: 'Username is exist',
          });
        } else {
          throw new BadRequestException({
            name: 'email',
            message: 'Email is exist',
          });
        }
      }
      const auth = await this.authRepository.save({
        ...authDTO,
        password: await hashPassword(authDTO.password),
      });
      switch (auth.role) {
        case RolesEnum.USER:
          await this.customerService.create(auth, {
            firstName,
            lastName,
            middleName,
            dob,
          });
          return this.createConfirmation(auth);
        case RolesEnum.SHOP:
          await this.customerService.create(auth, {
            shop_name,
          });
          return this.createConfirmation(auth);
        case RolesEnum.ADMIN:
          throw new BadRequestException('Admin is not supported');
        default:
          throw new BadRequestException('Role is not supported');
      }
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.response);
    }
  }
  async loginSeller(dto: LoginDTO) {
    const { username, password } = dto;
    if (!username || !password) {
      throw new BadRequestException('Username or password is not provided');
    }
    const auth = await this.authRepository.findOne({
      where: {
        username: username,
      },
      select: {
        password: true,
        username: true,
        role: true,
        active: true,
        email: true,
      },
    });
    if (!auth) {
      throw new ForbiddenException('Your username or password is incorrect!');
    }
    if (auth.role !== RolesEnum.SHOP) {
      throw new ForbiddenException('You are not permission');
    }
    if (!auth) {
      throw new NotFoundException(`Could not found user with ${username}`);
    }
    const checkPassword = await this.validateUser(auth.password, password);

    if (!checkPassword) {
      throw new ForbiddenException('Your username or password is incorrect!');
    }
    if (!auth.active) {
      throw new ForbiddenException('Your account is not active');
    }
    const user = await this.customerService.getMe(auth.username);
    const data = {
      _id: user._id,
      role: auth.role,
      username: auth.username,
      email: auth.email,
    };
    //  scan if user has token
    const keys = await this.cacheService.keys(
      `refreshtoken-${auth.username}-*`,
    );
    if (keys.length > 0) {
      await this.cacheService.del(keys);
    }

    const accessToken = this.generateToken(
      this.configService.get<string>('jwt.accessTokenExpire'),
      data,
    );
    if (dto.rememberMe) {
      const refreshToken = this.generateToken(
        this.configService.get<string>('jwt.refreshTokenExpire'),
      );
      const dataKey = Object.keys(data);
      for (const key of dataKey) {
        await this.cacheService.hSet(
          `refreshtoken-${data.username}-${refreshToken}`,
          key,
          `${data[key]}`,
        );
      }
      await this.cacheService.expire(
        `refreshtoken-${data.username}-${refreshToken}`,
        this.configService.get<number>('jwt.refreshTokenExpire') / 1000,
      );
      return {
        accessToken,
        refreshToken,
      };
    }
    return {
      accessToken,
    };
  }
  async login(dto: LoginDTO) {
    const { username, password } = dto;
    if (!username || !password) {
      throw new BadRequestException('Username or password is not provided');
    }
    const auth = await this.authRepository.findOne({
      where: {
        username: username,
      },
      select: {
        password: true,
        username: true,
        role: true,
        active: true,
        email: true,
      },
    });

    if (!auth) {
      throw new NotFoundException(`Could not found user with ${username}`);
    }
    if (auth.role !== RolesEnum.USER) {
      throw new ForbiddenException(
        `You are not permission! Please navgiate to ${auth.role} page login`,
      );
    }
    const checkPassword = await this.validateUser(auth.password, password);

    if (!checkPassword) {
      throw new ForbiddenException('Your password is incorrect');
    }
    if (!auth.active) {
      throw new ForbiddenException('Your account is not active');
    }
    const user = await this.customerService.getMe(auth.username);
    const data = {
      _id: user._id,
      role: auth.role,
      username: auth.username,
      email: auth.email,
    };
    //  scan if user has token
    const keys = await this.cacheService.keys(
      `refreshtoken-${auth.username}-*`,
    );
    if (keys.length > 0) {
      await this.cacheService.del(keys);
    }
    const accessToken = this.generateToken(
      this.configService.get<string>('jwt.accessTokenExpire'),
      data,
    );
    if (dto.rememberMe) {
      const refreshToken = this.generateToken(
        this.configService.get<string>('jwt.refreshTokenExpire'),
      );
      const dataKey = Object.keys(data);
      for (const key of dataKey) {
        await this.cacheService.hSet(
          `refreshtoken-${data.username}-${refreshToken}`,
          key,
          `${data[key]}`,
        );
      }
      await this.cacheService.expire(
        `refreshtoken-${data.username}-${refreshToken}`,
        this.configService.get<number>('jwt.refreshTokenExpire') / 1000,
      );
      return {
        accessToken,
        refreshToken,
      };
    }
    return {
      accessToken,
    };
  }
  private validateUser(
    password: string,
    newPassword: string,
  ): Promise<boolean> {
    return checkPassword(newPassword, password);
  }
  private generateToken(expire: string, data: {} = {}) {
    return this.jwtService.sign(data, {
      expiresIn: expire,
    });
  }
  async logout(refreshToken: string) {
    const keys = await this.cacheService.keys(`*-${refreshToken}`);
    await this.cacheService.del(keys);
  }
  async refreshToken(refreshToken: string) {
    try {
      console.log(
        '🚀 ~ file: auth.service.ts:225 ~ AuthService ~ refreshToken ~ refreshToken',
        refreshToken,
      );
      const keys = await this.cacheService.keys(`*-${refreshToken}`);
      const data = await this.cacheService.hGetAll(keys[0]);
      console.log(
        '🚀 ~ file: auth.service.ts:233 ~ AuthService ~ refreshToken ~ data:',
        data,
      );
      console.log(
        '🚀 ~ file: auth.service.ts:233 ~ AuthService ~ refreshToken ~ keys:',
        keys,
      );

      if (Object.keys(data).length === 0) {
        console.log('Your refresh token is not valid');

        throw new ForbiddenException('Your refresh token is not valid');
      }
      const accessToken = this.generateToken(
        this.configService.get<string>('jwt.accessTokenExpire'),
        data,
      );
      return accessToken;
    } catch (error) {
      throw new ForbiddenException('Your refresh token is not valid');
    }
  }
  async createConfirmation(auth: AuthEntity) {
    const characters =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    const x = Date.now() % 25;
    const min = 2;
    const max = 4;
    let temp = '';
    for (let i = 0; i < Math.floor(Math.random() * (max - min) + min); i++) {
      temp += characters[Math.floor(Math.random() * characters.length)];
    }
    for (let i = 0; i < 25; i++) {
      token += characters[Math.floor(Math.random() * characters.length)];
      if (i === x) token += temp;
    }
    this.cacheService.set(token, auth.username);
    this.cacheService.expire(token, 10800);
    return token;
  }
  async confirm(token: string) {
    const username = await this.cacheService.get(token);
    if (!username) {
      throw new BadRequestException('Token invalid');
    }
    const auth = await this.authRepository.findOne({
      where: {
        username,
      },
    });
    if (!auth) {
      throw new BadRequestException('Token invalid! Could not find username');
    }
    auth.active = true;
    this.authRepository.save(auth);
    this.cacheService.del(token);
    return {
      role: auth.role,
    };
  }
}
