import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";

@Entity()
export class Category{
    @PrimaryGeneratedColumn("uuid")
    _id: string;
    @Column()
    name: string;
    @ManyToMany(()=> Category)
    @JoinTable({name: "category_category"})
    children: Category[];
    @OneToMany(()=> Product, product=> product.category)
    products: Product[];

}