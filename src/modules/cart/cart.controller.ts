import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IdParam } from '@/common';
import { User } from '@/models';

import { CurrentUser, JwtAuthGuard } from '../auth';

import { CartService } from './cart.service';
import { CartControllerDocs as Docs } from './cart.controller.docs';
import { CartItemResponse, CreateCartRequest } from './dtos';

@ApiTags('장바구니 API')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Docs.add('장바구니에 상품 추가')
  @Post()
  @UseGuards(JwtAuthGuard)
  async add(@Body() dto: CreateCartRequest, @CurrentUser() user: User) {
    await this.cartService.add(dto, user);
  }

  @Docs.getAll('장바구니 상품 목록 조회')
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@CurrentUser() user: User): Promise<CartItemResponse[]> {
    return this.cartService.getAll(user);
  }

  @Docs.delete('장바구니에서 상품 제거')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param() { id }: IdParam, @CurrentUser() user: User) {
    await this.cartService.remove(id, user);
  }
}
