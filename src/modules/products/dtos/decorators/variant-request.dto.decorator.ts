import { applyDecorators } from '@nestjs/common';

import { SwaggerValidation } from '@/common';
import { VariantDoc } from '@/docs';
import { VariantValidation } from '@/models';

export const VariantRequestDto = {
  variantId() {
    return applyDecorators(VariantDoc.variantId(), SwaggerValidation.id());
  },

  quantity() {
    return applyDecorators(VariantDoc.quantity(), VariantValidation.quantity());
  },

  hide() {
    return applyDecorators(VariantDoc.hide(), VariantValidation.hide());
  },
};
