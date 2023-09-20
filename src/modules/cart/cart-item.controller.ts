import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from '@/models';

import { CurrentUser, JwtAuthGuard } from '../auth';

import { CartService } from './cart.service';
import { CartItemControllerDocs as Docs } from './cart-item.controller.docs';
import {
  AddCartItemRequest,
  EditVariantParam,
  CartItemIdParam,
  EditCartItemRequest,
} from './dtos';

@ApiTags('장바구니 API')
@Controller('cart-items')
export class CartItemController {
  constructor(private readonly cartService: CartService) {}

  @Docs.add('장바구니에 상품 추가')
  @Post()
  @UseGuards(JwtAuthGuard)
  async add(@Body() dto: AddCartItemRequest, @CurrentUser() user: User) {
    await this.cartService.addItem(dto, user);
  }

  @Docs.editVariant('장바구니 아이템 옵션 변경')
  @Patch(':cartItemId/variants/:variantId')
  @UseGuards(JwtAuthGuard)
  async editVariant(
    @Param() { cartItemId, variantId }: EditVariantParam,
    @CurrentUser() user: User,
  ) {
    await this.cartService.editVariant(cartItemId, variantId, user);
  }

  @Docs.editItem('장바구니 아이템 속성 변경')
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async editItem(
    @Param() { id }: CartItemIdParam,
    @Body() dto: EditCartItemRequest,
    @CurrentUser() user: User,
  ) {
    await this.cartService.editItem(id, dto, user);
  }
}
