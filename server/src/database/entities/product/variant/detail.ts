import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ProductVariantOption } from './options';

@Entity()
export class ProductVariantDetail {
  // SKU format: product_id-option_1-option-n
  @PrimaryColumn({})
  sku: string;
  @Column()
  price: number;
  @Column()
  stock: number;
  @Column({ default: 0 })
  sold: number;
}
