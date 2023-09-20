import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { User } from '@/models';

import { CurrentUser, JwtAuthGuard } from '../auth';

import { CreateOrderRequest, OrderIdParam, OrderResponse } from './dtos';

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

  @Doc.getOne('주문 조회')
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(
    @Param() { id }: OrderIdParam,
    @CurrentUser() user: User,
  ): Promise<OrderResponse> {
    return this.ordersService.getOne(id, user);
  }
}
