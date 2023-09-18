import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CurrentUser, JwtAuthGuard } from '../auth';
import { CreateCartDto } from './dtos';
import { User } from '@/models';
import { CartControllerDocs as Docs } from './cart.controller.docs';

@ApiTags('장바구니 API')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Docs.create('장바구니에 상품 추가')
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateCartDto, @CurrentUser() user: User) {
    await this.cartService.create(dto, user);
  }
}
