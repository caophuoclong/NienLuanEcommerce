import { Column, Entity, Index, OneToOne, PrimaryColumn } from "typeorm";
import { RolesEnum } from '../../enum/roles.enum';
import { Customer } from './customer';

@Entity({
    name: "auth"
})
export class AuthEntity{
    @PrimaryColumn({
        nullable: false,
        unique: true
    })
    username: string;
    @Column({
        nullable: false,
        select: false
    })
    password: string;
    @Column({
        default: false
    })
    active: boolean;
    @Column({
        type: "enum",
        enum: RolesEnum,
        default: RolesEnum.USER
    })
    role: RolesEnum;
        @Column({
        unique: true
    })
    // @Index()
    phone: string
    @Column({
        unique: true
    })
    // @Index()
    email: string
    @OneToOne(()=> Customer, customer => customer.auth)
    customer: Customer
}