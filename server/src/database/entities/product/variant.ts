import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './index';
import { CartItem } from '../cart/cartItem';
import { JoinTable } from 'typeorm';
@Entity()
export class ProductVariant {
  @PrimaryGeneratedColumn()
  _id: string;
  @ManyToOne(() => Product, (product) => product.variant)
  @JoinColumn()
  product: Product;
  @ManyToMany(() => CartItem, (cartItem) => cartItem.products)
  cartItems: CartItem[];
  @Column()
  price: number;
  @Column()
  stock: number;
  @Column({
    default: 0,
  })
  sold: number;
  @Column({
    nullable: true,
  })
  attribute_1: string;
  @Column({
    nullable: true,
  })
  value_1: string;
  @Column({
    nullable: true,
  })
  attribute_2: string;
  @Column({
    nullable: true,
  })
  value_2: string;
  @Column()
  images: string;
}
