import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCard } from 'src/database/entities/creditCard';
import { Payment } from 'src/database/entities/payment';
import { Customer } from 'src/database/entities/customer';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCard, Payment, Customer])],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
