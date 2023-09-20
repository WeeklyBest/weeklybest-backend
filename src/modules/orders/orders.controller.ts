import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { User } from '@/models';

import { CurrentUser, JwtAuthGuard } from '../auth';

import { CreateOrderRequest } from './dtos';

import { OrdersControllerDoc as Doc } from './controller.doc';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Doc.register('주문 등록')
  @Post()
  @UseGuards(JwtAuthGuard)
  async register(
    @Body() dto: CreateOrderRequest,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.ordersService.register(dto, user);
  }
}
