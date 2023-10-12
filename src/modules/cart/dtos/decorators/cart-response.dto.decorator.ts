import { applyDecorators } from '@nestjs/common';

import { CartDoc } from '@/docs';

export const CartResponseDto = {
  cartId() {
    return applyDecorators(CartDoc.cartId());
  },

  quantity() {
    return applyDecorators(CartDoc.quantity());
  },
};
