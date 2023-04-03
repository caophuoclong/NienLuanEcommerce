import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { AddressService } from './address.service';

@Controller('address')
@ApiTags('Address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
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
