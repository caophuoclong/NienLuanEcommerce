import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { RolesEnum } from '../enum/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Public } from 'src/decorators/public.decorator';

@Controller('product')
@UseGuards(RolesGuard)
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ){}
    @Roles(RolesEnum.SHOP)
    @Post("/")
    createProduct(){
        return this.productService.createProduct()
    }
    @Public()
    @Get("/")
    getProduct(){
        return "Get product"
    }

}
