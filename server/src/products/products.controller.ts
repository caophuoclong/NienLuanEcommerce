import { Controller, Get, Inject } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private productService: ProductsService
    ){

    }
    @Get()
    getAll(){
        return this.productService.getAll();
    }
}
