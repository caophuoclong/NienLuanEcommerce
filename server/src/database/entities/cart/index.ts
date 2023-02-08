import { Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../customer";
import { Product } from "../product";
import { CartItem } from "./cartItem";

@Entity()
export class Cart{
    @PrimaryGeneratedColumn("uuid")
    _id: string;
    @OneToOne(()=> Customer, cus => cus.cart)
    @JoinColumn()
    customer: Customer;
    @OneToMany(()=> CartItem, cartItem => cartItem.cart)
    cartItems: CartItem[];

}