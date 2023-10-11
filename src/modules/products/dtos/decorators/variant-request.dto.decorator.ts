import { applyDecorators } from '@nestjs/common';

import { SwaggerValidation } from '@/common';
import { VariantDoc } from '@/docs';

export const VariantRequestDto = {
  variantId() {
    return applyDecorators(VariantDoc.variantId(), SwaggerValidation.id());
  },
};
