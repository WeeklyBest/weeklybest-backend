import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { CartItemResponse } from './dtos';

export const CartControllerDocs = {
  getMyCartItems(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '로그인된 회원의 장바구니에 담긴 상품 목록을 가져옵니다.',
      }),
      ApiOkResponse({
        type: [CartItemResponse],
      }),
    );
  },
};
