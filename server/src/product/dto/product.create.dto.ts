import { ApiProperty } from "@nestjs/swagger";

export class ProductCreateDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    description: string;
    @ApiProperty()
    category: number;
    // @ApiProperty()
    // images: string[];
    // @ApiProperty()
    // quantity: number;
    // @ApiProperty()
    // discount: number;
}