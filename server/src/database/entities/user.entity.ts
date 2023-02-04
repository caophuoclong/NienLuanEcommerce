import {
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthEntity } from './auth.entity';
import { GenderEnum } from '../../enum/gender.enum';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;
  @OneToOne(() => AuthEntity, auth => auth.username)
  @JoinColumn({
    name: "username"
  })
  auth: AuthEntity;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({
    nullable: true,
  })
  middleName: string;
  @Column({
    type: 'date',
  })
  dob: Date;
  @Column({
    type: 'enum',
    enum: GenderEnum,
    default: GenderEnum.OTHER,
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
  @AfterUpdate()
  afterUpdate() {
    this.updatedAt = Date.now();
  }
}
