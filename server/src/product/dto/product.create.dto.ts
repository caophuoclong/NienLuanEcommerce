import { ApiProperty } from "@nestjs/swagger";
import { Category } from '../../database/entities/category/index';
import { ProductMeta } from '../../database/entities/product/meta';

export class ProductCreateDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    category: Category;
    @ApiProperty()
    meta: [
        Omit<ProductMeta, "sold" | "_id" | "attribute_1" | "attribute_2" | "value_1" | "value_2">
    ];
    @ApiProperty()
    detail: {[key: string]: string}
    // @ApiProperty()
    // images: string[];
    // @ApiProperty()
    // quantity: number;
    // @ApiProperty()
    // discount: number;
}