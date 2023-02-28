import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from '../../database/entities/category/index';
import {
  IProduct,
  IProductDetail,
  IProductMeta,
} from '../../interface/product';
export class ProductCreateDto implements IProduct {
  @ApiPropertyOptional()
  _id?: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  category: Category;
  @ApiProperty()
  meta: Array<IProductMeta>;
  @ApiProperty()
  detail: Array<IProductDetail>;
  @ApiPropertyOptional()
  description?: string;
}
