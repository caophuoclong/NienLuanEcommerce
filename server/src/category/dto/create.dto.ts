import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
export class CreateCategory{
    @ApiProperty()
    @IsNotEmpty({
        message: "name  is required"
    })
    name: string;
    @IsNotEmpty({
        message: "requireDetail is required"
    })
    @ApiProperty()
    @Matches(/^\w+(\/[a-zA-Z0-9]+)+$/, {
        message: "requireDetail must be a string with format: 'aavb/bas/csad/...'"
    })
    requireDetail: string;
    @ApiProperty()
    parent: number;
}