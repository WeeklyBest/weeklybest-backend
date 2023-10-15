import { applyDecorators } from '@nestjs/common';

import { SwaggerDoc } from '@/common';
import { SizeValueDoc } from '@/docs';
import { SizeValueValidation } from '@/models';

export const SizeValueRequestDto = {
  sizeValueId() {
    return applyDecorators(SizeValueDoc.sizeValueId());
  },

  label() {
    return applyDecorators(SizeValueDoc.label(), SizeValueValidation.label());
  },

  order() {
    return applyDecorators(
      SwaggerDoc.order('사이즈 값 정렬 순서'),
      SizeValueValidation.order(),
    );
  },
};
