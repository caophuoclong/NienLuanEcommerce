import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { RolesEnum } from '../enum/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Public } from 'src/decorators/public.decorator';
import { ProductCreateDto } from './dto/product.create.dto';
import { Request } from 'express';
import { ProductGetDTO } from './dto/product.get.dto';
@Controller('product')
@UseGuards(RolesGuard)
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ){}
    @Roles(RolesEnum.SHOP)
    @Post("/")
    createProduct(@Body() createProductDTO: ProductCreateDto, @Req() request){
        const {_id} = request.user;
        return this.productService.createProduct(createProductDTO, _id);
    }
    @Public()
    @Get("/")
    getProduct(@Query() query: ProductGetDTO){
        return this.productService.getProducts(query);
    }
    @Public()
    @Get("/:_id")
    getProductById(@Param("_id") _id: string){
        return this.productService.getProduct(_id);
    }

}
