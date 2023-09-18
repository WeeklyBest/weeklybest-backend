import {
  Body,
  Controller,
  Delete,
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
import { CreateCartDto } from './dtos';

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

  @Docs.delete('장바구니에서 상품 제거')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param() { id }: IdParam, @CurrentUser() user: User) {
    await this.cartService.remove(id, user);
  }
}
