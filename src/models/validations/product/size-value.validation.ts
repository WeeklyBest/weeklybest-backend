import { applyDecorators } from '@nestjs/common';

import { IsString, MaxLength } from 'class-validator';

import {
  SwaggerEntityDocType,
  getIsStringMessage,
  getMaxLengthMessage,
} from '@/common';

import { SIZE_VALUE } from '@/models/constants';
import { SizeValue } from '@/models/entities';

import { CommonValidation } from '../common.validation';

export const SizeValueValidation: SwaggerEntityDocType<SizeValue> = {
  label() {
    const property = SIZE_VALUE.LABEL.KR;
    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
      MaxLength(SIZE_VALUE.LABEL.MAX_LENGTH, {
        message: getMaxLengthMessage({
          property,
          maxLength: SIZE_VALUE.LABEL.MAX_LENGTH,
        }),
      }),
    );
  },

  order() {
    return CommonValidation.order();
  },
};
