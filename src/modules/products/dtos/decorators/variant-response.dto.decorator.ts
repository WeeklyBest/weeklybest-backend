import { applyDecorators } from '@nestjs/common';

import { VariantDoc } from '@/docs';

export const VariantResponseDto = {
  variantId() {
    return applyDecorators(VariantDoc.variantId());
  },

  quantity() {
    return applyDecorators(VariantDoc.quantity());
  },
};
