import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { AddCartItemResponse } from './dtos';

export const CartItemControllerDoc = {
  add(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '장바구니에 상품을 담습니다.',
      }),
      ApiCreatedResponse({
        description: '장바구니 아이템 추가 성공',
        type: AddCartItemResponse,
      }),
    );
  },

  getCartItems(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '로그인된 회원의 장바구니 상품 목록을 조회합니다.',
      }),
    );
  },

  editVariant(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '장바구니에 담은 상품의 옵션을 변경합니다.',
      }),
      ApiBadRequestResponse({
        description: '해당 상품이 제공하지 않는 옵션입니다.',
      }),
      cartItemNotFoundResponse(),
      ApiConflictResponse({
        description: '다른 장바구니 아이템과 중복되는 옵션입니다.',
      }),
    );
  },

  editItem(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '장바구니에 담은 상품의 수량을 변경합니다.',
      }),
      cartItemNotFoundResponse(),
      ApiConflictResponse({
        description: '구매 가능 수량 초과',
      }),
    );
  },

  remove(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '장바구니에 등록된 상품을 하나 제거합니다.',
      }),
      cartItemNotFoundResponse(),
    );
  },

  count(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '장바구니에 등록된 상품 개수를 조회합니다.',
      }),
      ApiOkResponse({
        description: '장바구니 상품 개수 조회 성공',
        type: Number,
      }),
    );
  },
};

const cartItemNotFoundResponse = () =>
  ApiNotFoundResponse({
    description: '장바구니 또는 아이템을 찾을 수 없습니다.',
  });
