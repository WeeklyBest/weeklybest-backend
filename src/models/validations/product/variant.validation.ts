import { applyDecorators } from '@nestjs/common';

import { IsBoolean, IsInt } from 'class-validator';

import {
  SwaggerEntityDocType,
  getIsBooleanMessage,
  getIsIntMessage,
} from '@/common';

import { VARIANT } from '@/models/constants';
import { Variant } from '@/models/entities';

export const VariantValidation: SwaggerEntityDocType<Variant> = {
  quantity(propertyName?: string) {
    const property = propertyName || VARIANT.QUANTITY.KR;
    return applyDecorators(IsInt({ message: getIsIntMessage({ property }) }));
  },

  hide(propertyName?: string) {
    const property = propertyName || VARIANT.HIDE.KR;
    return applyDecorators(
      IsBoolean({ message: getIsBooleanMessage({ property }) }),
    );
  },
};
