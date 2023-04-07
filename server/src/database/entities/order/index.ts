import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Address from '../address';
import { Customer } from '../customer';
import { Payment } from '../payment';
import { Shipping } from '../shipping';
import { OrderItem } from './orderItem';
export enum OrderStatus {
  PENDING = 'PENDING', // when the order is created
  PROCESSING = 'PROCESSING', // when the order is paid or the payment is confirmed or shop accept payment method
  SHIPPED = 'SHIPPED', // when the order is sent to the delivery company
  DELIVERING = 'DELIVERING', // when the order is delivering to the customer
  DELIVERED = 'DELIVERED', // when the customer received the order
  CANCELLED = 'CANCELLED', // when the customer cancel the order or the shop cancel the order
  RETURNED = 'RETURNED', // when the shop received the order after the customer return the order
  REFUNDED = 'REFUNDED', // when the shop refunded the order
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  _id: number;
  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;
  @ManyToOne(() => Shipping)
  shippingProvider: Shipping;
  @Column()
  shippingCost: number;
  @Column()
  tax: number;
  @OneToMany(() => OrderItem, (ori) => ori.order, {
    onDelete: 'CASCADE',
  })
  orderItems: OrderItem[];
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;
  @ManyToOne(() => Payment, (payment) => payment.orders)
  payment: Payment;
  @ManyToOne(() => Customer, (shop) => shop.orders)
  @JoinColumn()
  shop: Customer;
  @ManyToOne(() => Address)
  @JoinColumn()
  address: Address;
  @Column('bigint', {
    default: new Date().getTime(),
  })
  createdAt: number;
}
