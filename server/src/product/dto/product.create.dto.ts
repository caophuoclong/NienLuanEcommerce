import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../database/entities/category/index';
import { ProductMeta } from '../../database/entities/product/meta';

export class ProductCreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  category: Category;
  @ApiProperty()
  meta: {
    images: string;
    price: number;
    stock: number;
    detail: { [key: string]: any };
    attribute: Array<{ key: string; value: any }>;
  }[];
  @ApiProperty( {default: 0})
  sold: number ;
  @ApiProperty()
  detail: { [key: string]: string };
}
