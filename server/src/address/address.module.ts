import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from 'src/database/entities/address/province';
import { District } from 'src/database/entities/address/district';
import { Ward } from 'src/database/entities/address/ward';
import Address from 'src/database/entities/address';

@Module({
  imports: [TypeOrmModule.forFeature([Province, District, Ward, Address])],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
