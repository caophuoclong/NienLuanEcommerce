import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Province } from './province';
import { Customer } from '../customer';
import { Ward } from './ward';

@Entity()
export default class Address {
  @PrimaryGeneratedColumn()
  _id: number;
  @ManyToOne(() => Customer, (customer) => customer.address, {
    cascade: true,
  })
  customer: Customer;
  @ManyToOne(() => Ward, (ward) => ward.addresses)
  @JoinColumn({ name: 'ward_code' })
  ward: Ward;
  @Column({
    nullable: true,
  })
  detail: string;
  @Column()
  name: string;
  @Column()
  phone: string;
  @Column({
    default: Date.now(),
    type: 'bigint',
  })
  createdAt: number;
  @OneToMany(() => Customer, (cus) => cus.shop_address)
  shop: Customer;
}
