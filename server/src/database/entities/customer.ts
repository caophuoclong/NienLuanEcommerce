import { GenderEnum } from "src/enum/gender.enum";
import { AfterUpdate, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuthEntity } from "./auth.entity";
import Address from "./address";

@Entity()
export class Customer{
@PrimaryGeneratedColumn('uuid')
  _id: string;
  @OneToOne(() => AuthEntity, auth => auth.username)
  @JoinColumn({
    name: "username"
  })
  auth: AuthEntity;
  @Column({
    nullable: true,
  })
  firstName: string;
  @Column({
    nullable: true,
  })
  lastName: string;
  @Column({
    nullable: true,
  })
  middleName: string;
  @Column({
    nullable: true
  })
  name: string;
  @Column({
    type: 'date',
    nullable: true,
    // current date in 18y before
  })
  dob: Date;
  @Column({
    type: 'enum',
    enum: GenderEnum,
    nullable: true,
    default: null,
  })
  gender: GenderEnum;
  @Column({
    default: Date.now(),
    type: 'bigint',
  })
  createdAt: number;
  @Column({
    default: 0,
    type: 'bigint',
  })
  updatedAt: number;
  @OneToMany(()=> Address, address => address.customer)
  address: Address[];
  @AfterUpdate()
  afterUpdate() {
    this.updatedAt = Date.now();
  }
}