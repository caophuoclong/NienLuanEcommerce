import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../category.entity";
import { ProductMeta } from "./meta";
import { Customer } from '../customer';
import { CartItem } from "../cart/cartItem";

@Entity()
export class Product{
    @PrimaryGeneratedColumn("uuid")
    _id: string;
    @Column()
    name: string;
    @Column()
    price: number;
    @Column()
    description: string;
    @ManyToOne(()=> Category, category=> category.products)
    @JoinTable({name: "category_product"})
    category: Category;
    @OneToMany(()=> ProductMeta, meta=> meta.product)
    meta: ProductMeta[];
    @ManyToOne(()=> Customer, customer=> customer.products)
    shop: Customer;
    @OneToMany(()=> CartItem, cartItem => cartItem.product)
    cartItems: CartItem[];
}