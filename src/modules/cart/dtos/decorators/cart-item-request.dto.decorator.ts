import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Transform, Type } from 'class-transformer';
import { IsArray } from 'class-validator';

import { SwaggerValidation } from '@/common';
import { CartItemDoc } from '@/docs';

export const CartItemRequestDto = {
  cartItemId() {
    return applyDecorators(CartItemDoc.cartItemId(), SwaggerValidation.id());
  },

  cartItemIds(options?: { required?: boolean }) {
    return applyDecorators(
      ApiProperty({
        isArray: true,
        description: '장바구니 아이템 식별자 목록',
        example: [1, 2],
        required: options?.required || false,
      }),
      Type(() => Number),
      Transform(({ value }) => (value.length ? value : [value])),
      IsArray({
        message: '장바구니 아이템 식별자 목록은 배열 타입이어야 합니다.',
      }),
    );
  },
};
