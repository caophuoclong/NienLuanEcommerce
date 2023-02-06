import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Province } from "./province";
import { Customer } from "../customer";
import { Ward } from "./ward";

@Entity()
export default class Address{
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Customer, customer => customer.address,{
        cascade: true
    })
    customer: Customer;
    @ManyToOne(()=> Ward, ward => ward.addresses)
    @JoinColumn({name: "ward_code"})
    ward: Ward;
    @Column()
    detail: string;
}