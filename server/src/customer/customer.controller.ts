import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';
import { CustomerService } from './customer.service';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('customer')
@ApiTags("Customer")
@UseGuards(JwtAuthGuard)
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService
    ){}
    @Get()
    getMe(@Req() req: Request){
        const {username} = req.user ;        
    return this.customerService.getMe(username);
    }
}
