import {
  Body,
  Controller,
  Delete,
  Get,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddToCartDTO } from './dto/addToCartDTO';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CartService } from './cart.service';
import { Request } from 'express';
import { UpdateCartDTO } from './dto/updateCartDTO';

@Controller('cart')
@ApiTags('Cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post('/')
  async addToCart(@Body() dto: AddToCartDTO, @Req() req: Request) {
    return this.cartService.addToCart(dto, req.user._id);
  }
  @Get('/')
  async getCart(@Req() req: Request) {
    return this.cartService.getCart(req.user._id);
  }
  @Patch('/')
  async updateCart(@Body() dto: UpdateCartDTO) {
    return this.cartService.update(dto._id, dto.field);
  }
  @Delete('/product/many')
  async handleDeleteManyCartItem(@Body() body: number[]) {
    return this.cartService.handleDeleteManyCartItem(body);
  }
  @Delete('/product')
  async handleDeleteProductItem(
    @Query('sku') sku: string,
    @Req() req: Request,
  ) {
    const { _id } = req.user;
    return this.cartService.handleDeleteProductItem(sku, _id);
  }
}
