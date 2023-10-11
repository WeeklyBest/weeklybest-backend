import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { CartItemDoc } from '@/docs';

import { ColorResponse } from '@/modules/colors';
import { SizeValueResponse } from '@/modules/size';

export const CartItemResponseDto = {
  cartItemId() {
    return applyDecorators(CartItemDoc.cartItemId());
  },

  stock() {
    return applyDecorators(
      ApiProperty({
        description: '재고 수량',
        example: 10,
      }),
    );
  },

  disabled() {
    return applyDecorators(
      ApiProperty({
        description: '구매 불가 상태',
        example: false,
      }),
    );
  },

  color() {
    return applyDecorators(
      ApiProperty({
        description: '색상 옵션',
        type: ColorResponse,
      }),
    );
  },

  size() {
    return applyDecorators(
      ApiProperty({
        description: '사이즈 옵션',
        type: SizeValueResponse,
      }),
    );
  },
};
