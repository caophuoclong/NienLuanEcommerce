import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDTO } from './dto/registration.dto';
import { LoginDTO } from './dto/login.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';
import { Response } from 'express';
import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}
    @Post("/register")
    register(@Body() dto: RegistrationDTO){
        this.authService.registration(dto);
        return "12312312";

    }
    @Post("/login")
    async login(@Body() dto: LoginDTO, @Res({
        passthrough: true
    }) res: Response){
        const {accessToken, refreshToken} = await this.authService.login(dto);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
        })
        res.json(accessToken);
    }
}
