import { applyDecorators } from '@nestjs/common';

import { IsInt, IsPositive, Max } from 'class-validator';

import { SwaggerEntityDocType, getMaxMessage } from '@/common';

import { CART_ITEM } from '@/models/constants';
import { CartItem } from '@/models/entities';

export const CartItemValidation: SwaggerEntityDocType<CartItem> = {
  quantity() {
    const property = CART_ITEM.QUANTITY.KR;
    return applyDecorators(
      IsInt(),
      IsPositive(),
      Max(CART_ITEM.QUANTITY.MAX, {
        message: getMaxMessage({ property, max: CART_ITEM.QUANTITY.MAX }),
      }),
    );
  },
};
