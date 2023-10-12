import { applyDecorators } from '@nestjs/common';

import { IsBoolean, IsString, MaxLength } from 'class-validator';

import {
  SwaggerEntityDocType,
  getIsBooleanMessage,
  getIsStringMessage,
  getMaxLengthMessage,
} from '@/common';

import { QUESTION } from '@/models/constants';
import { Question } from '@/models/entities';

export const QuestionValidation: SwaggerEntityDocType<Question> = {
  title() {
    const property = QUESTION.TITLE.KR;
    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
      MaxLength(QUESTION.TITLE.MAX_LENGTH, {
        message: getMaxLengthMessage({
          property,
          maxLength: QUESTION.TITLE.MAX_LENGTH,
        }),
      }),
    );
  },

  content() {
    const property = QUESTION.CONTENT.KR;
    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
    );
  },

  isPrivate() {
    const property = QUESTION.IS_PRIVATE.KR;
    return applyDecorators(
      IsBoolean({ message: getIsBooleanMessage({ property }) }),
    );
  },
};
