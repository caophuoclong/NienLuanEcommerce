import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthEntity } from '../database/entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICustomer } from 'src/interface/customer';
import UserInfo from '../interface/userInfo';
import { Customer } from 'src/database/entities/customer';

@Injectable()
export class CustomerService implements ICustomer {
  constructor(
    @InjectRepository(Customer)
    private readonly customerEntity: Repository<Customer>,
  ) {}
  async create(
    auth: AuthEntity,
    data: Partial<{ firstName: string; lastName: string; middleName: string; name: string }>,
  ) {
    try {
      const user = this.customerEntity.create({ auth: {
        username: auth.username
      }, ...data });
      return await this.customerEntity.save(user);
    } catch (error) {
      const message = error.message;
      console.log(
        '🚀 ~ file: user.service.ts:29 ~ UserService ~ message',
        message,
      );
      throw new BadRequestException('Could not create user');
    }
  }
  async getMe(username: string) {
    return await this.customerEntity.findOne({
      where: {
        auth: {
          username,
        },
      },
    });
  }
}
