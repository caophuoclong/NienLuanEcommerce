import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDTO } from './dto/registration.dto';
import { LoginDTO } from './dto/login.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './auth.guard';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}
  @Public()
  @Post('/register')
  @ApiOkResponse({
    description: 'Register successfully',
  })
  async register(@Body() dto: RegistrationDTO) {
    // console.log(dto);
    return this.authService.registration(dto);
    // return 'Create user successfully';
  }
  @Public()
  @Post('/login')
  async login(
    @Body() dto: LoginDTO,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(dto);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
    return accessToken;
  }
  @Public()
  @Post('/login/seller')
  async loginSeller(
    @Body() dto: LoginDTO,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.loginSeller(
      dto,
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
    res.json(accessToken);
  }
  @Public()
  @Get('/refreshToken')
  async refreshToken(@Req() request: Request) {
    const refreshToken = request.cookies['refreshToken'];
    console.log(
      '🚀 ~ file: auth.controller.ts:40 ~ AuthController ~ refreshToken ~ refreshToken',
      refreshToken,
    );
    if (refreshToken === 'undefined' || !refreshToken) {
      console.log('Not Privde refreshToken');
      throw new BadRequestException('Refresh token is not provided');
    }
    const accessToken = await this.authService.refreshToken(refreshToken);
    return accessToken;
  }
  @Post('/logout')
  async logout(
    @Req() request: Request,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    const refreshToken = request.cookies['refreshToken'];
    refreshToken && (await this.authService.logout(refreshToken));
    res.clearCookie('refreshToken');
    return 'Logout successfully';
  }
  @Public()
  @Post('/confirm')
  async confirm(@Body('token') token: string) {
    return this.authService.confirm(token);
  }
  @Public()
  @Post('/changePassword')
  changePassword(
    @Body()
    {
      username,
      password,
      secret,
    }: {
      password: string;
      username: string;
      secret: string;
    },
  ) {
    if (secret === this.configService.get('server')['secret']) {
      return this.authService.changePassword(password, username);
    }
    throw new BadRequestException('Secret is not correct');
  }
}
