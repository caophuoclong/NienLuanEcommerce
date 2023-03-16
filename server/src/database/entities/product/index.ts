import {
  AfterInsert,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../category';
import { ProductVariant } from './variant';
import { Customer } from '../customer';
import { CartItem } from '../cart/cartItem';
import { ProductDetail } from './detail';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  _id: string;
  @Column()
  name: string;
  @Column({
    type: 'longtext',
  })
  description?: string;
  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'category_product' })
  category: Category;
  @OneToMany(() => ProductVariant, (variant) => variant.product, {
    onDelete: 'CASCADE',
  })
  variant: ProductVariant[];
  @ManyToOne(() => Customer, (customer) => customer.products, {
    onDelete: 'CASCADE',
  })
  shop: Customer;
  @OneToMany(() => ProductDetail, (detail) => detail.product, {
    onDelete: 'CASCADE',
  })
  detail: ProductDetail[];
  @Column({ default: new Date().getTime(), type: 'bigint' })
  createdAt: number;
  @Column({
    default: 0,
    type: 'bigint',
  })
  updatedAt: number;
  @Column({
    default: false,
  })
  hasVariant: boolean;
  @Column({
    default: null,
  })
  price: number;
  @Column({
    default: null,
  })
  stock: number;
  @Column({
    default: null,
  })
  sold: number;
}
