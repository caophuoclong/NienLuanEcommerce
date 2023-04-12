import { ApiPropertyOptional } from "@nestjs/swagger";

export class ProductGetDTO{
    @ApiPropertyOptional()
    category: number;
    @ApiPropertyOptional()
    name: string;
    @ApiPropertyOptional()
    minPrice: number;
    @ApiPropertyOptional()
    maxPrice: number;
    @ApiPropertyOptional()
    shop: string;
    @ApiPropertyOptional()
    page: number;
}