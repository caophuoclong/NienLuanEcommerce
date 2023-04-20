import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { OrderStatus } from 'src/database/entities/order';
import { CheckoutDTO } from './dto/checkoutDTO';
import { OrderService } from './order.service';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  checkout(@Req() request: Request, @Body() order: CheckoutDTO) {
    const {
      user: { _id },
    } = request;
    return this.orderService.checkout(_id, order);
  }
  @Patch('/')
  updateOrderStatus(@Body() data: { _id: number; status: OrderStatus }) {
    return this.orderService.updateOrderStatus(data._id, data.status);
  }
  @Get('/')
  getAllOrders(@Req() { user: { _id } }: Request) {
    return this.orderService.getAllOrders(_id);
  }
  @Get('/card')
  getExistingCard(@Req() request: Request) {
    return this.orderService.getExistingCard(request.user._id);
  }
  @Get('/shop')
  getOrdersPershop(@Req() { user: { _id } }: Request) {
    return this.orderService.getOrdersPerShop(_id);
  }
  @Patch('/status')
  updateStatusOrder(@Body() data: { _id: number; status: OrderStatus }) {
    return this.orderService.updateStatusOrder(data);
  }
}
