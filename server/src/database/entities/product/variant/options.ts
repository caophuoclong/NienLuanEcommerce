import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductVariant } from '../variant';
import { Product } from '../index';
@Entity()
export class ProductVariantOption {
  @PrimaryGeneratedColumn()
  _id: number;
  @ManyToOne(() => ProductVariant)
  productVariant: ProductVariant;
  @Column()
  value: string;
  @ManyToOne(() => Product, (pr) => pr.productVariantOptions, {
    onDelete: 'CASCADE',
  })
  product: Product;
  @Column({
    nullable: true,
  })
  image: string;
}
