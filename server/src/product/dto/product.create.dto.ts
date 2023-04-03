import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from '../../database/entities/category/index';
import {
  IProduct,
  IProductDetail,
  IProductVariant,
} from '../../interface/product';
export class ProductCreateDto {
  @ApiPropertyOptional()
  _id?: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  category: Category;
  @ApiProperty()
  variants: Array<{
    type: string;
    options: {
      _id: number;
      value: string;
      image?: string;
    }[];
  }>;
  @ApiProperty()
  hasVariant: boolean;
  @ApiProperty()
  variantDetails: {
    key: string;
    stock: number;
    price: number;
  }[];
  @ApiProperty()
  detail: Array<IProductDetail>;
  @ApiPropertyOptional()
  price: number;
  @ApiPropertyOptional()
  stock: number;
  @ApiPropertyOptional()
  images: {
    type: string;
    images: Array<string>;
  };
  @ApiPropertyOptional()
  description?: string;
}
