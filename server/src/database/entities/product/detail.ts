import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './index';
import { Category } from '../category';

@Entity('product_detail')
export class ProductDetail {
  @PrimaryGeneratedColumn()
  _id: number;
  @ManyToOne((type) => Product, (product) => product.detail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: Product;
  @Column()
  key: string;
  @Column()
  value: string;
}
