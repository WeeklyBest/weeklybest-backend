import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { QuestionDoc } from '@/docs';

export const QuestionResponseDto = {
  questionId() {
    return applyDecorators(QuestionDoc.questionId());
  },

  title() {
    return applyDecorators(QuestionDoc.title());
  },

  content() {
    return applyDecorators(QuestionDoc.content());
  },

  isPrivate() {
    return applyDecorators(QuestionDoc.isPrivate());
  },

  username() {
    return applyDecorators(
      ApiProperty({
        description: '작성자 이름',
        example: '홍**',
      }),
    );
  },
};
