import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('product_variant')
export class ProductVariant {
  @PrimaryGeneratedColumn()
  _id: number;
  @Column({
    unique: false,
  })
  name: string;
}
