import { applyDecorators } from '@nestjs/common';

import { IsString, MaxLength } from 'class-validator';

import {
  SwaggerEntityDocType,
  getIsStringMessage,
  getMaxLengthMessage,
} from '@/common';

import { SIZE_GROUP } from '@/models/constants';
import { SizeGroup } from '@/models/entities';

export const SizeGroupValidation: SwaggerEntityDocType<SizeGroup> = {
  label() {
    const property = SIZE_GROUP.LABEL.KR;
    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
      MaxLength(SIZE_GROUP.LABEL.MAX_LENGTH, {
        message: getMaxLengthMessage({
          property,
          maxLength: SIZE_GROUP.LABEL.MAX_LENGTH,
        }),
      }),
    );
  },
};
