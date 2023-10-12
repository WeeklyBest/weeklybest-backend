import { applyDecorators } from '@nestjs/common';

import { SwaggerValidation } from '@/common';
import { CategoryDoc } from '@/docs';

export const CategoryRequestDto = {
  categoryId() {
    return applyDecorators(CategoryDoc.categoryId(), SwaggerValidation.id());
  },
};
