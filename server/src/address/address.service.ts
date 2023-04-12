import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Address from 'src/database/entities/address';
import { District } from 'src/database/entities/address/district';
import { Province } from 'src/database/entities/address/province';
import { Ward } from 'src/database/entities/address/ward';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    @InjectRepository(Ward)
    private readonly wardRepository: Repository<Ward>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}
  getProvince() {
    return this.provinceRepository.find();
  }
  async getDistrict(code: string) {
    const province = await this.provinceRepository.findOneBy({
      code: code,
    });
    if (!province) {
      throw new BadRequestException('Not found province!');
    }
    const district = await this.districtRepository.find({
      where: {
        province: {
          code: province.code,
        },
      },
    });
    return district;
  }
  async getWard(code: string) {
    const district = await this.districtRepository.findOneBy({
      code: code,
    });
    if (!district) {
      throw new BadRequestException('Not found district!');
    }
    const ward = await this.wardRepository.find({
      where: {
        district: {
          code: district.code,
        },
      },
    });
    return ward;
  }
  async getExistAddress(_id: string) {
    const existAddress = await this.addressRepository.find({
      where: {
        customer: {
          _id,
        },
      },
      relations: {
        ward: {
          district: {
            province: true,
          },
        },
      },
      order: {
        createdAt: 'DESC',
      },
      take: 3,
    });
    return existAddress;
  }
}
