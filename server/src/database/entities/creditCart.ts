import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Customer } from "./customer";

@Entity()
export class CreditCart{
    @PrimaryColumn()
    number: string;
    @Column()
    owner: string;
    @Column()
    expire: Date;
    @Column()
    ccv: number;
    @ManyToOne(()=> Customer, customer => customer.creditCards)
    customer: Customer
}