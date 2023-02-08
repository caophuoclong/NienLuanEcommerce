import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { RolesEnum } from '../../enum/roles.enum';
import { GenderEnum } from '../../enum/gender.enum';

export class RegistrationDTO{
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    phone: string;
    @ApiPropertyOptional()
    firstName: string;
    @ApiPropertyOptional()
    lastName: string;
    @ApiPropertyOptional()
    middleName?: string;
    @ApiProperty({
        default: RolesEnum.USER
    })
    role: RolesEnum;
    @ApiPropertyOptional()
    name: string;
}