import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Customer } from './customer';

@Entity()
export class CreditCard {
  @PrimaryColumn()
  number: string;
  @Column()
  holder: string;
  @Column()
  mm: number;
  @Column()
  yy: number;
  @Column()
  cvv: number;
  @ManyToOne(() => Customer, (customer) => customer.creditCards)
  @JoinColumn()
  customer: Customer;
  @Column()
  email: string;
  @Column('bigint', {
    default: new Date().getTime(),
  })
  createdAt: number;
  @Column('bigint', {
    default: new Date().getTime() / 100000,
  })
  balance: number;
}
