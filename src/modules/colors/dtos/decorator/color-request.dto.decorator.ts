import { applyDecorators } from '@nestjs/common';

import { SwaggerValidation } from '@/common';
import { ColorDoc } from '@/docs';
import { ColorValidation } from '@/models';

export const ColorRequestDto = {
  colorId() {
    return applyDecorators(ColorDoc.colorId(), SwaggerValidation.id());
  },

  label() {
    return applyDecorators(ColorDoc.label(), ColorValidation.label);
  },

  hexCode() {
    return applyDecorators(ColorDoc.hexCode(), ColorValidation.hexCode());
  },
};
