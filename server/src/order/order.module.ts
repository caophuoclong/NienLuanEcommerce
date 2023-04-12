import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Address from 'src/database/entities/address';
import { CartItem } from 'src/database/entities/cart/cartItem';
import { CreditCard } from 'src/database/entities/creditCard';
import { Customer } from 'src/database/entities/customer';
import { Order } from 'src/database/entities/order';
import { OrderItem } from 'src/database/entities/order/orderItem';
import { Payment } from 'src/database/entities/payment';
import { Product } from 'src/database/entities/product';
import { ProductVariant } from 'src/database/entities/product/variant';
import { ProductVariantDetail } from 'src/database/entities/product/variant/detail';
import { ProductVariantOption } from 'src/database/entities/product/variant/options';
import { PaymentModule } from 'src/payment/payment.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Address,
      Order,
      OrderItem,
      Payment,
      CreditCard,
      CartItem,
      ProductVariantDetail,
      Customer,
      Product,
      ProductVariantOption,
      ProductVariant,
    ]),
    PaymentModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
