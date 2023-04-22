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
import { Customer } from '../customer';
import { ProductDetail } from './detail';
import { ProductVariantOption } from './variant/options';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  _id: number;
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
  @OneToMany(() => ProductVariantOption, (variant) => variant.product, {
    onDelete: 'CASCADE',
  })
  variant: ProductVariantOption[];
  @ManyToOne(() => Customer, (customer) => customer.products, {
    onDelete: 'CASCADE',
  })
  shop: Customer;
  @OneToMany(() => ProductDetail, (detail) => detail.product, {
    onDelete: 'CASCADE',
  })
  detail: ProductDetail[];
  @OneToMany(() => ProductVariantOption, (option) => option.product)
  productVariantOptions: ProductVariantOption[];
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
  @Column({
    default: false})
  deleted: boolean;
}
