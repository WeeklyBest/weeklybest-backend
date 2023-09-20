import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from '@/models';

import { CurrentUser, JwtAuthGuard } from '../auth';
import { CartItemResponse } from './dtos';

import { CartService } from './cart.service';
import { CartControllerDoc as Doc } from './controller.doc';

@ApiTags('장바구니 API')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Doc.getMyCartItems('장바구니 상품 목록 조회')
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getMyCartItems(@CurrentUser() user: User): Promise<CartItemResponse[]> {
    return this.cartService.getMyCartItems(user);
  }
}
