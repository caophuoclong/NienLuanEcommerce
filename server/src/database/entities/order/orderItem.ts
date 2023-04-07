import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '.';
import { ProductVariantDetail } from '../product/variant/detail';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  _id: number;
  @ManyToOne(() => Order, {
    onDelete: 'CASCADE',
  })
  order: Order;
  @ManyToOne(() => ProductVariantDetail)
  @JoinColumn()
  productVariantDetail: ProductVariantDetail;
  @Column({
    default: 0,
  })
  price: number;
  @Column({
    default: 0,
  })
  quantity: number;
}
