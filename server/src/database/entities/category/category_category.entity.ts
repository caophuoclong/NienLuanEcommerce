import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '.';

@Entity('category_category')
export class TreeCategory {
  @PrimaryColumn()
  parent: number;
  @PrimaryColumn()
  child: number;
}
