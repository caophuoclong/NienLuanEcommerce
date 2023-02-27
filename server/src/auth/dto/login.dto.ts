import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class LoginDTO{
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
    @ApiPropertyOptional()
    rememberMe?: boolean;
}