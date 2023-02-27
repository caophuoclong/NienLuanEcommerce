import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../category";
import { ProductMeta } from "./meta";
import { Customer } from '../customer';
import { CartItem } from "../cart/cartItem";
import { ProductDetail } from "./detail";

@Entity()
export class Product{
    @PrimaryGeneratedColumn("uuid")
    _id: string;
    @Column()
    name: string;
    @Column({
        default: ""
    })
    description: string;
    @ManyToOne(()=> Category, category=> category.products,{
        onDelete: "CASCADE"
    })
    @JoinTable({name: "category_product"})
    category: Category;
    @OneToMany(()=> ProductMeta, meta=> meta.product)
    meta: ProductMeta[];
    @ManyToOne(()=> Customer, customer=> customer.products)
    shop: Customer;
    @OneToMany(()=> CartItem, cartItem => cartItem.product)
    cartItems: CartItem[];
    @OneToMany(()=> ProductDetail, detail=> detail.product)
    detail: ProductDetail[];
}