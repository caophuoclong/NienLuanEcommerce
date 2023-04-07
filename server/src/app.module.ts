import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigsModule } from './configs/configs.module';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { ShopModule } from './shop/shop.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import multer, { diskStorage } from 'multer';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigsModule,
    AuthModule,
    CustomerModule,
    ShopModule,
    CartModule,
    ProductModule,
    CategoryModule,
    AddressModule,
    OrderModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
