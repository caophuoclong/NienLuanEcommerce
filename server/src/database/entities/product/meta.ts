import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from './index';
@Entity()
export class ProductMeta{
    @PrimaryGeneratedColumn()
    _id: string;
    @Column()
    key: string;
    @Column()
    value: string;
    @Column()
    type: string;
    @Column()
    price: number;
    @Column()
    sold: number;
    @ManyToOne(()=> Product, product=> product.meta)
    @JoinColumn()
    product: Product;
}