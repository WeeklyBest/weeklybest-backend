import { applyDecorators } from '@nestjs/common';

import { SwaggerDoc } from '@/common';
import { SizeValueDoc } from '@/docs';

export const SizeValueResponseDto = {
  sizeValueId() {
    return applyDecorators(SizeValueDoc.sizeValueId());
  },

  label() {
    return applyDecorators(SizeValueDoc.label());
  },

  order() {
    return applyDecorators(SwaggerDoc.order('사이즈 값 정렬 순서'));
  },
};
