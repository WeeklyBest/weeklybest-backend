import { applyDecorators } from '@nestjs/common';

import { ColorDoc } from '@/docs';

export const ColorResponseDto = {
  colorId() {
    return applyDecorators(ColorDoc.colorId());
  },

  label() {
    return applyDecorators(ColorDoc.label());
  },

  hexCode() {
    return applyDecorators(ColorDoc.hexCode());
  },
};
