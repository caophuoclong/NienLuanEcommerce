import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { RolesEnum } from '../enum/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Public } from 'src/decorators/public.decorator';
import { ProductCreateDto } from './dto/product.create.dto';
import { Request } from 'express';
import { ProductGetDTO } from './dto/product.get.dto';
import { ApiTags } from '@nestjs/swagger';
import { SearchProductDTO } from './dto/searchProduct.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage, Multer } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
@Controller('product')
@UseGuards(RolesGuard)
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Roles(RolesEnum.SHOP)
  @Post('/')
  createProduct(@Body() createProductDTO: ProductCreateDto, @Req() request) {
    const { _id } = request.user;
    // console.log(createProductDTO);
    // return 'create success!';
    return this.productService.createProduct(createProductDTO, _id);
  }
  @Roles(RolesEnum.SHOP)
  @Put('/')
  updateProduct(@Body() product: ProductCreateDto) {
    return this.productService.editProduct(product);
  }
  @Public()
  @Get('/home')
  getHomeProduct(@Query() query: { perPage?: number; page?: number }) {
    return this.productService.getProductsHome({
      perPage: query.perPage,
      page: query.page,
    });
  }
  @Public()
  @Get('/')
  getProducts(@Query() query: ProductGetDTO, @Req() req: Request) {
    return this.productService.getProducts(query);
  }
  @Public()
  @Get('/search')
  searchProducts(@Query() query: SearchProductDTO) {
    return this.productService.searchProduct(query);
  }
  @Public()
  @Get('/search/shop')
  searchShopProducts(@Query('shop') username: string) {
    return this.productService.getShopProductsWithUsername(username);
  }
  @Public()
  @Get('/search/category')
  searchCategoryProducts(@Query('_id') _id: number) {
    return this.productService.getCategoryProduct(_id);
  }
  @Roles(RolesEnum.SHOP)
  @Get('/q/shop')
  queryProduct(@Query() query: { name: string }, @Req() req: Request) {
    const { _id, role } = req.user;
    return this.productService.queryProducts(
      {
        name: query.name,
        shop: _id,
        page: 0,
      },
      10000,
    );
  }
  @Public()
  @Get('/get/:_id')
  getProduct(@Param('_id') _id) {
    return this.productService.getProduct(_id);
  }
  @Get('/shop')
  async getProductByShop(
    @Req() req: Request,
    @Query()
    query: {
      page: number;
    },
  ) {
    const { _id } = req.user;
    const skip = 10;
    const { page = 0 } = query;
    const result = await this.productService.getShopProducts(_id, page, skip);
    return result;
  }
  @Post('/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/images',
        filename(req, file, callback) {
          const fileName = uuidv4() + path.extname(file.originalname);
          callback(null, fileName);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return file.filename;
  }
}
