import { AfterUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuthEntity } from './auth.entity';
@Entity({
    name: "shop"
})
export class ShopEntity{
    @PrimaryGeneratedColumn("uuid")
    _id: string
    @OneToOne(()=> AuthEntity, auth => auth.username)
    @JoinColumn({
    name: "username"
  })
    auth: AuthEntity
    @Column({
        default: Date.now(),
        type: "bigint"
    })
    createdAt: number
    @Column({
        default: 0,
                type: "bigint"
    })
    updatedAt: number
    @Column({
        unique: true
    })
    @Column()
    name: string    
    @AfterUpdate()
    afterUpdate(){
        this.updatedAt = Date.now()
    }
}