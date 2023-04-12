import { ApiProperty } from '@nestjs/swagger';
import { CartItem } from '../../database/entities/cart/cartItem';
export class UpdateCartDTO {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  field: Partial<CartItem>;
}
