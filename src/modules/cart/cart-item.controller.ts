import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from '@/models';

import { CurrentUser, JwtAuthGuard } from '@/modules/auth';

import {
  AddCartItemRequest,
  EditVariantParam,
  CartItemIdParam,
  EditCartItemRequest,
  CartItemIdsQuery,
} from './dtos';

import { CartService } from './cart.service';
import { CartItemControllerDoc as Doc } from './controller.doc';

@ApiTags('장바구니 API')
@Controller('cart-items')
export class CartItemController {
  constructor(private readonly cartService: CartService) {}

  @Doc.add('장바구니에 상품 추가')
  @Post()
  @UseGuards(JwtAuthGuard)
  async add(@Body() dto: AddCartItemRequest, @CurrentUser() user: User) {
    await this.cartService.addItem(dto, user);
  }

  @Doc.getCartItems('장바구니 상품 목록 조회')
  @Get()
  @UseGuards(JwtAuthGuard)
  async getCartItems(
    @Query() { id: ids }: CartItemIdsQuery,
    @CurrentUser() user: User,
  ) {
    return this.cartService.getCartItems(ids, user);
  }

  @Doc.editVariant('장바구니 아이템 옵션 변경')
  @Patch(':cartItemId/variants/:variantId')
  @UseGuards(JwtAuthGuard)
  async editVariant(
    @Param() { cartItemId, variantId }: EditVariantParam,
    @CurrentUser() user: User,
  ) {
    await this.cartService.editVariant(cartItemId, variantId, user);
  }

  @Doc.editItem('장바구니 아이템 속성 변경')
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
