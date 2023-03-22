import {
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

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  _id: string;
  @ManyToMany(() => ProductVariant, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  products: ProductVariant[];
  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart: Cart;
  @Column()
  quantity: number;
}
