import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';

@Controller('user')
@UseGuards(JwtAuthGuard)
@Roles(RolesEnum.USER)
export class CustomerController {
    @Get()
    getMe(){
        return "me"
    }
}
