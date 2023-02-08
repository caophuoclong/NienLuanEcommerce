
import { Customer } from 'src/database/entities/customer';
import { AuthEntity } from '../database/entities/auth.entity';

export interface ICustomer{
    create(auth: AuthEntity, infor: any): Promise<Customer>;
    getMe(username: string) : Promise<Customer>;
}