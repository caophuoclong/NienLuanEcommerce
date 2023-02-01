import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductsService {
    constructor(
    ){}
    getAll(){        
        return "123123";
    }
}
