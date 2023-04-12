import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreditCard } from './creditCard';
import { Customer } from './customer';
import { Order } from './order';

export enum PaymentType {
  COD = 'COD',
  CREDIT_CARD = 'CREDIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  PAYPAL = 'PAYPAL',
}
export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}
@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  _id: string;
  @ManyToOne(() => Customer, (customer) => customer.payments)
  customer: Customer;
  @Column('enum', {
    enum: PaymentType,
  })
  type: PaymentType;
  @Column('enum', {
    enum: PaymentStatus,
    default: PaymentStatus.SUCCESS,
  })
  status: PaymentStatus;
  @Column()
  amount: number;
  @Column('bigint', {
    default: new Date().getTime(),
  })
  createdAt: number;
  @OneToMany(() => Order, (order) => order.payment)
  orders: Order[];
  @ManyToOne(() => CreditCard)
  @JoinColumn()
  creditCard: CreditCard;
}
