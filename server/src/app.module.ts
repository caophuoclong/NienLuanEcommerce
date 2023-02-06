import {  MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigsModule } from './configs/configs.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [DatabaseModule, ConfigsModule, ProductsModule, AuthModule, CustomerModule, ShopModule],
  controllers: [],
  providers: [],
})
export class AppModule{
 
}
