import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";

@Entity()
export class Category{
    @PrimaryGeneratedColumn("increment")
    _id: number;
    @Column()
    name: string;
    @ManyToMany(()=> Category)
    @JoinTable({name: "category_category",
        joinColumn: {
            name: "parent",
            referencedColumnName: "_id"
        },
        inverseJoinColumn:{
            name: "child",
            referencedColumnName: "_id"
        }
})
    children: Category[];
    @OneToMany(()=> Product, product=> product.category)
    products: Product[];
    @Column("bigint",{
        default: Date.now()
    })
    createdAt: number;

}