import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer";

export enum PaymentType{
    COD = "COD",
    CREDIT_CARD = "CREDIT_CARD",
    BANK_TRANSFER = "BANK_TRANSFER"
}
export enum PaymentStatus{
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"

}
@Entity()
export class Payment{
    @PrimaryGeneratedColumn("uuid")
    _id: string;
    @ManyToOne(()=> Customer, customer => customer.payments)
    customer: Customer;
    @Column("enum", {
        enum: PaymentType,
    })
    type: PaymentType
    @Column("enum",{
        enum: PaymentStatus
    })
    status: PaymentStatus;
    @Column("bigint",{
        default: new Date().getTime()
    })
    createdAt: number;
}