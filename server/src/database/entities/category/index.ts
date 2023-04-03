import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../product';
import { ProductDetail } from '../product/detail';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  _id: number;
  @Column()
  name_vi: string;
  @Column()
  name_en: string;
  @ManyToMany(() => Category, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'category_category',

    joinColumn: {
      name: 'parent',
      referencedColumnName: '_id',
    },
    inverseJoinColumn: {
      name: 'child',
      referencedColumnName: '_id',
    },
  })
  children: Category[];
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
  @Column('bigint', {
    default: Date.now(),
  })
  createdAt: number;
  @Column({
    nullable: true,
  })
  requireDetail: string;
}
