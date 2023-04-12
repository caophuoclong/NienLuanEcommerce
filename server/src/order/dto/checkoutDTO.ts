import { ApiProperty } from '@nestjs/swagger';
import { District } from 'src/database/entities/address/district';
import { Province } from 'src/database/entities/address/province';
import { Ward } from 'src/database/entities/address/ward';
import { CartItem } from 'src/database/entities/cart/cartItem';
import { PaymentType } from 'src/database/entities/payment';
export interface ICard {
  _id: string;
  number: string;
  holder: string;
  exp: {
    mm: number;
    yy: number;
  };
  cvv: number;
  email: string;
  type?: 'visa' | 'mastercard';
}
export interface IAdress {
  _id?: number;
  ward: Ward;
  detail: string;
  name: string;
  phone: string;
}
export class CheckoutDTO {
  @ApiProperty()
  address: IAdress;
  @ApiProperty()
  products: CartItem[];
  @ApiProperty()
  card: ICard;
  @ApiProperty({
    default: true,
  })
  save: boolean;
  @ApiProperty()
  payment: {
    method: PaymentType;
  };
}
