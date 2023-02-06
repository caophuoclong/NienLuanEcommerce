import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigsModule } from 'src/configs/configs.module';
import { AuthEntity } from './entities/auth.entity';
import { Customer } from './entities/customer';
import Address from './entities/address';
import { AdministrativeRegion } from './entities/address/administrativeRegion';
import { AdministrativeUnit } from './entities/address/administrativeUnit';
import { Province } from './entities/address/province';
import { District } from './entities/address/district';
import { Ward } from './entities/address/ward';

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
          entities: [AuthEntity, Customer, Address, AdministrativeRegion, AdministrativeUnit, Province, District, Ward],
          synchronize: true,
        };
      },
      inject: [ConfigService]
    }),
  ],
})
export class DatabaseModule {}
