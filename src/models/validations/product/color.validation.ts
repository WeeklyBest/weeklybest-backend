import { applyDecorators } from '@nestjs/common';

import { IsString, Max } from 'class-validator';

import {
  SwaggerEntityDocType,
  getIsStringMessage,
  getMaxMessage,
} from '@/common';

import { COLOR } from '@/models/constants';
import { Color } from '@/models/entities';

export const ColorValidation: SwaggerEntityDocType<Color> = {
  label(propertyName?: string) {
    const property = propertyName || COLOR.LABEL.KR;
    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
      Max(COLOR.LABEL.MAX, {
        message: getMaxMessage({ property, max: COLOR.LABEL.MAX }),
      }),
    );
  },

  hexCode(propertyName?: string) {
    const property = propertyName || COLOR.HEX_CODE.KR;
    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
      Max(COLOR.LABEL.MAX, {
        message: getMaxMessage({ property, max: COLOR.HEX_CODE.MAX }),
      }),
    );
  },
};
