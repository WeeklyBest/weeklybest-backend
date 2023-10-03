import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Pagination, PagingQuery } from '@/common';
import { User } from '@/models';

import { CurrentUser, JwtAuthGuard } from '../auth';

import {
  CreateOrderRequest,
  EditOrderRequest,
  OrderIdParam,
  OrderResponse,
} from './dtos';

import { OrdersControllerDoc as Doc } from './controller.doc';
import { OrdersService } from './orders.service';

@ApiTags('주문 API')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Doc.register('주문 등록')
  @Post()
  @UseGuards(JwtAuthGuard)
  async register(
    @Body() dto: CreateOrderRequest,
    @CurrentUser() user: User,
  ): Promise<number> {
    return this.ordersService.register(dto, user);
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

  @Doc.getMe('내 주문 목록 조회')
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(
    @Param() { pageNum = 1, pageSize = 5 }: PagingQuery,
    @CurrentUser() user: User,
  ): Promise<Pagination<OrderResponse>> {
    return this.ordersService.getMe({ pageNum, pageSize }, user);
  }

  @Doc.edit('주문 정보 수정')
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async edit(
    @Param() { id }: OrderIdParam,
    @Body() dto: EditOrderRequest,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.ordersService.edit(id, dto, user);
  }

  @Doc.cancel('주문 취소')
  @Patch(':id/cancel')
  @UseGuards(JwtAuthGuard)
  async cancel(
    @Param() { id }: OrderIdParam,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.ordersService.cancel(id, user);
  }
}
