import { applyDecorators } from '@nestjs/common';

import { SwaggerValidation } from '@/common';
import { ProductImageDoc } from '@/docs';

export const ProductImageRequestDto = {
  productImageId() {
    return applyDecorators(
      ProductImageDoc.productImageId(),
      SwaggerValidation.id(),
    );
  },

  url() {
    return applyDecorators(ProductImageDoc.url());
  },

  order() {
    return applyDecorators(ProductImageDoc.order());
  },
};
