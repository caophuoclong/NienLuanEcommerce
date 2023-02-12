import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetCategory{
    @ApiPropertyOptional()
    name: string;
}