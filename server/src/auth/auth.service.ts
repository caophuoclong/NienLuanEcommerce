import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { RegistrationDTO } from './dto/registration.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AuthEntity } from '../database/entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { checkPassword } from 'src/utils/password';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>,
        private readonly configService: ConfigService
    ){}
    registration(dto: RegistrationDTO){
        
    }
   async  login(dto: LoginDTO){
        const {username, password} = dto;
        // const auth = await this.authRepository.findOne({
        //     where:{
        //         username
        //     },
        //     select:{
        //         password: true,
        //         username: true,
        //         role: true,
        //         active: true
        //     }
        // })
        // if(!auth){
        //     throw new NotFoundException(`Could not found user with ${username}`)
        // }
        // const checkPassword = await this.validateUser(auth.password, password)
        // if(!checkPassword){
        //     throw new ForbiddenException("Your password is incorrect");
        // }
        const accessToken = this.generateToken(this.configService.get<string>("jwt.accessTokenExpire"));
        const refreshToken = this.generateToken(this.configService.get<string>("jwt.refreshTokenExpire"));
        return {
            accessToken,
            refreshToken,
        }
    }
    private validateUser(password: string, newPassword: string): Promise<boolean>{
        return checkPassword(newPassword, password);
    }

    private generateToken(expire: string, data: {} = {}){
        return this.jwtService.sign(data,{
            expiresIn: expire,
        })
    }

    refreshToken(_id: string){

    }
}
