import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/database/entities/customer';
import { CartItem } from '../database/entities/cart/cartItem';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CartItem])],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule {}
