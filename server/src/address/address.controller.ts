import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/decorators/public.decorator';
import { AddressService } from './address.service';

@Controller('address')
@ApiTags('Address')
@UseGuards(JwtAuthGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Get('/')
  getExistAddress(@Req() request: Request) {
    const {
      user: { _id },
    } = request;
    return this.addressService.getExistAddress(_id);
  }
  @Get('/province')
  @Public()
  getProvince() {
    return this.addressService.getProvince();
  }
  @Get('/district')
  @Public()
  getDistrict(@Query('provinceCode') code: string) {
    return this.addressService.getDistrict(code);
  }
  @Get('/ward')
  @Public()
  getWard(@Query('districtCode') code: string) {
    return this.addressService.getWard(code);
  }
}
