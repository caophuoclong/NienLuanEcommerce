import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from ".";
import { Product } from "../product";

@Entity()
export class CartItem{
    @PrimaryGeneratedColumn()
    _id: string;
    @ManyToOne(()=> Product, product=> product.cartItems)
    product: Product;
    @ManyToOne(()=> Cart, cart=> cart.cartItems)
    cart: Cart
    @Column()
    quantity: number
}