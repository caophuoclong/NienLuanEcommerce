import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './index';
@Entity()
export class ProductMeta {
  @PrimaryGeneratedColumn()
  _id: string;
  @ManyToOne(() => Product, (product) => product.meta)
  @JoinColumn()
  product: Product;
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
