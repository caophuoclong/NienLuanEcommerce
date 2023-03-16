import { Body, Controller, ParseUUIDPipe, Post } from '@nestjs/common';

@Controller('cart')
export class CartController {
  @Post('/')
  async addToCart(@Body('productId', new ParseUUIDPipe()) productId: string) {
    console.log(productId);
    return 'Success!';
  }
}
