import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from '../../database/entities/category/index';
import {
  IProduct,
  IProductDetail,
  IProductVariant,
} from '../../interface/product';
export class ProductCreateDto implements IProduct {
  @ApiPropertyOptional()
  _id?: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  category: Category;
  @ApiProperty()
  variant: Array<IProductVariant>;
  @ApiProperty()
  detail: Array<IProductDetail>;
  @ApiPropertyOptional()
  description?: string;
}
