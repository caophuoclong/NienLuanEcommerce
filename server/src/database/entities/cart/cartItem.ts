import {
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from '.';
import { Product } from '../product';
import { ProductVariant } from '../product/variant';
import { ProductVariantDetail } from '../product/variant/detail';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  _id: string;
  @ManyToOne(() => ProductVariantDetail, (pro) => pro.cartItems, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  product: ProductVariantDetail;
  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart: Cart;
  @Column()
  quantity: number;
  @Column({
    type: 'bigint',
    default: Date.now(),
  })
  createdAt: number;
  @Column({
    type: 'bigint',
    default: 0,
  })
  updatedAt: number;
}
