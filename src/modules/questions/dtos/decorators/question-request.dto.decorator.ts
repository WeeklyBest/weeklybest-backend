import { applyDecorators } from '@nestjs/common';

import { SwaggerValidation } from '@/common';
import { QuestionDoc } from '@/docs';
import { QuestionValidation } from '@/models';

export const QuestionRequestDto = {
  questionId() {
    return applyDecorators(QuestionDoc.questionId(), SwaggerValidation.id());
  },

  title() {
    return applyDecorators(QuestionDoc.title(), QuestionValidation.title());
  },

  content() {
    return applyDecorators(QuestionDoc.content(), QuestionValidation.content());
  },

  isPrivate() {
    return applyDecorators(
      QuestionDoc.isPrivate(),
      QuestionValidation.isPrivate(),
    );
  },
};
