import { ApiProperty } from '@nestjs/swagger';
import { ProductVariantDetail } from '../../database/entities/product/variant/detail';

export class AddToCartDTO {
  @ApiProperty()
  productVariantDetail: ProductVariantDetail;
  @ApiProperty({
    default: 1,
  })
  quantity: number;
}
