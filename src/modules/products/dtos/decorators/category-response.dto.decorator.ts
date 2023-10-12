import { applyDecorators } from '@nestjs/common';

import { CategoryDoc } from '@/docs';

export const CategoryResponseDto = {
  categoryId() {
    return applyDecorators(CategoryDoc.categoryId());
  },

  name() {
    return applyDecorators(CategoryDoc.name());
  },

  code() {
    return applyDecorators(CategoryDoc.code());
  },
};
