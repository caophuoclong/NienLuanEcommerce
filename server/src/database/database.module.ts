import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigsModule } from 'src/configs/configs.module';
import { AuthEntity } from './entities/auth.entity';
import { UserEntity } from './entities/user.entity';
import { ShopEntity } from './entities/shop.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigsModule],
      useFactory(configService: ConfigService) {
        const config = configService.get<{
          port: number;
          host: string;
          username: string;
          password: string;
          name: string;
          type: "mysql";
        }>('database');
        return {
          type: config.type,
          host: config.host,
          port: +config.port,
          username: config.username,
          password: config.password,
          database: config.name,
          entities: [AuthEntity, UserEntity, ShopEntity],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
