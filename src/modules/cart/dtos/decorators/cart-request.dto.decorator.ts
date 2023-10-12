import { applyDecorators } from '@nestjs/common';

import { SwaggerValidation } from '@/common';
import { CartDoc } from '@/docs';
import { CartItemValidation } from '@/models';

export const CartRequestDto = {
  cartId() {
    return applyDecorators(CartDoc.cartId(), SwaggerValidation.id());
  },

  quantity() {
    return applyDecorators(CartDoc.quantity(), CartItemValidation.quantity());
  },
};
