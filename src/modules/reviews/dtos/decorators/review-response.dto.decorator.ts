import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';
import { ReviewDoc } from '@/docs';

export const ReviewResponseDto = {
  reviewId() {
    return applyDecorators(ReviewDoc.reviewId());
  },

  content() {
    return applyDecorators(ReviewDoc.content());
  },

  imageUrl() {
    return applyDecorators(ReviewDoc.imageUrl());
  },

  rating() {
    return applyDecorators(ReviewDoc.rating());
  },

  authorId() {
    return applyDecorators(SwaggerDoc.id('작성자 식별자'));
  },

  author() {
    return applyDecorators(
      ApiProperty({
        description: '작성자 이름',
        example: '홍**',
      }),
    );
  },
};
