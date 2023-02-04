import { Column, Entity, Index, OneToOne, PrimaryColumn } from "typeorm";
import { RolesEnum } from '../../enum/roles.enum';
import { UserEntity } from './user.entity';
import { ShopEntity } from './shop.entity';

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
    @OneToOne(()=> UserEntity, (u)=>u.auth)
    user: UserEntity
    @OneToOne(()=> ShopEntity, s => s.auth)
    shop: ShopEntity
}