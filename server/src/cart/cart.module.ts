import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/database/entities/cart';
import { CartItem } from '../database/entities/cart/cartItem';
import { ProductVariantDetail } from '../database/entities/product/variant/detail';
import { Product } from 'src/database/entities/product';
import { ProductVariantOption } from 'src/database/entities/product/variant/options';

@Module({
  providers: [CartService],
  controllers: [CartController],
  imports: [
    TypeOrmModule.forFeature([
      Cart,
      CartItem,
      ProductVariantDetail,
      Product,
      ProductVariantOption,
    ]),
  ],
})
export class CartModule {}
