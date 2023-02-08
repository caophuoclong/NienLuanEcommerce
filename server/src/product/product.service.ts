import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    createProduct(){
        return "Create product successfully!"
    }
}
