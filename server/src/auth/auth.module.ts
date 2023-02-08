import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigsModule } from '../configs/configs.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from 'src/database/entities/auth.entity';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { CustomerModule } from '../customer/customer.module';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [ConfigModule,TypeOrmModule.forFeature([AuthEntity], ),CustomerModule,
  CacheModule,
  PassportModule,
  JwtModule.registerAsync({
    imports: [ConfigsModule],
    useFactory: (configService: ConfigService)=>{
      return {
        secret: configService.get<string>("jwt.secret"),
      }
    
    },
    inject: [ConfigService]
    
  })],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
