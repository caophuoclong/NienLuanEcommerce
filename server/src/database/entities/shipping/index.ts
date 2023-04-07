import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shipping {
  @PrimaryGeneratedColumn('uuid')
  _id: string;
  @Column()
  name: string;
}
