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
import { Category } from './entities/category';
import { Product } from './entities/product';
import { ProductVariant } from './entities/product/variant';
import { Cart } from './entities/cart';
import { CartItem } from './entities/cart/cartItem';
import { CreditCart } from './entities/creditCart';
import { Payment } from './entities/payment';
import { Coupon } from './entities/coupon';
import { TreeCategory } from './entities/category/category_category.entity';
import { ProductDetail } from './entities/product/detail';

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
          type: 'mysql';
        }>('database');
        return {
          type: config.type,
          host: config.host,
          port: +config.port,
          username: config.username,
          password: config.password,
          database: config.name,
          entities: [
            AuthEntity,
            Customer,
            Address,
            AdministrativeRegion,
            AdministrativeUnit,
            Province,
            District,
            Ward,
            Category,
            Product,
            ProductVariant,
            Cart,
            CartItem,
            CreditCart,
            Payment,
            Coupon,

            ProductDetail,
          ],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
