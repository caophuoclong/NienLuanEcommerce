import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
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
        @Inject("CACHE_MODULE")
        private readonly cacheService: RedisClientType
    ){}
    async registration(dto: RegistrationDTO){
        try{
        const {firstName, lastName, middleName, name, ...authDTO} = dto;
        const auth = await this.authRepository.save({
            ...authDTO,
            password: await hashPassword(authDTO.password),
        });    
        switch(auth.role){
            case RolesEnum.USER:
                await this.customerService.create(auth, {
                    firstName,
                    lastName,
                    middleName
                })
                break;
            case RolesEnum.SHOP:
                await this.customerService.create(auth, {
                    name
                });
                break;
            case RolesEnum.ADMIN:
                await this.customerService.create(auth, {
                    name
                });
                break;
            default:
                throw new BadRequestException("Role is not supported");
        }
        } 
        catch(err){
            throw new BadRequestException(err.message);
        }
    }
   async login(dto: LoginDTO){
        const {username, password} = dto;
        if(!username || !password){
            throw new BadRequestException("Username or password is not provided");
        }
        const auth = await this.authRepository.findOne({
            where:{
                username: username
            },
            select:{
                password: true,
                username: true,
                role: true,
                active: true,
                email: true
            }
        })        
        if(!auth){
            throw new NotFoundException(`Could not found user with ${username}`)
        }
        const checkPassword = await this.validateUser(auth.password, password)
    
        if(!checkPassword){
            throw new ForbiddenException("Your password is incorrect");
        }
        if(!auth.active){
            throw new ForbiddenException("Your account is not active");
        }
        const user = await this.customerService.getMe(auth.username);
        const data = {
            _id: user._id,
            role: auth.role,
            username: auth.username,
            email: auth.email
        }        
        const accessToken = this.generateToken(this.configService.get<string>("jwt.accessTokenExpire"),data);
        const refreshToken = this.generateToken(this.configService.get<string>("jwt.refreshTokenExpire"));
        const dataKey = Object.keys(data);
        for(const key of dataKey){
            await this.cacheService.hSet(refreshToken,key, `'${data[key]}'`)     
        }
        await this.cacheService.expire(refreshToken, this.configService.get<number>("jwt.refreshTokenExpire") / 1000)
        return {
            accessToken,
            refreshToken,
        }
    }
    private validateUser(password: string, newPassword: string): Promise<boolean>{
        return checkPassword(newPassword, password);
    }
    private generateToken(expire: string, data: {} = {}){
        console.log(data);
        return this.jwtService.sign(data,{
            expiresIn: expire,
        })
    }
    async logout(refreshToken: string){
        await this.cacheService.del(refreshToken);
    }
    async refreshToken(refreshToken: string){
        const data = await this.cacheService.hGetAll(refreshToken);
        if(Object.keys(data).length === 0){
            throw new ForbiddenException("Your refresh token is not valid");
        }
        const accessToken = this.generateToken(this.configService.get<string>("jwt.accessTokenExpire"),data);
        return accessToken
    }
}
