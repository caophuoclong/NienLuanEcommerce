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
    data: Partial<{
      firstName: string;
      lastName: string;
      middleName: string;
      shop_name: string;
    }>,
  ) {
    try {
      const user = this.customerEntity.create({
        auth: {
          username: auth.username,
        },
        ...data,
      });
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
    const user = await this.customerEntity.findOne({
      where: {
        auth: {
          username,
        },
      },
      select: {
        auth: {
          email: true,
          phone: true,
          username: true,
        },
        address: {
          _id: true,
          ward: {
            code: true,
            name: true,
            name_en: true,
            administrativeUnit: {
              id: true,
              short_name: true,
              short_name_en: true,
            },
            district: {
              code: true,
              name: true,
              name_en: true,
              administrativeUnit: {
                id: true,
                short_name: true,
                short_name_en: true,
              },
              province: {
                code: true,
                name: true,
                name_en: true,
                administrativeUnit: {
                  id: true,
                  short_name: true,
                  short_name_en: true,
                },
              },
            },
          },
        },
      },
      relations: {
        auth: true,
        address: {
          ward: {
            administrativeUnit: true,
            district: {
              administrativeUnit: true,
              province: {
                administrativeUnit: true,
              },
            },
          },
        },
      },
    });
    return user;
  }
}
