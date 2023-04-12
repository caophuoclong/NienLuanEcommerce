import { AfterUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from './customer';

export enum CouponType{
    PERCENTAGE = "PERCENTAGE",
    FIXED = "FIXED",
    FREE_SHIP = "FREE_SHIP",
    FREE_PRODUCT = "FREE_PRODUCT"
}

@Entity()
export class Coupon{
    @PrimaryGeneratedColumn("uuid")
    _id: string;
    @Column("enum", {
        enum: CouponType,
    })
    type: CouponType;
    @Column()
    amount: number;
    @Column()
    minium: number;
    @Column()
    start: Date;
    @Column()
    end: Date;
    @Column("bigint",{
        default: new Date().getTime()
    })
    createdAt: number;
    @Column("bigint")
    updatedAt: number;
    @ManyToMany(()=>Customer, customer => customer.storedCoupon)
    @JoinTable({name: "user_coupon"})
    user: Customer[]
    @AfterUpdate()
    afterUpdate(){
        this.updatedAt = new Date().getTime();
    }
}