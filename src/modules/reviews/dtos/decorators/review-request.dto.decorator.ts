import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsEnum, ValidateIf } from 'class-validator';

import { SwaggerValidation } from '@/common';
import { ReviewDoc } from '@/docs';
import { ReviewSort, ReviewValidation } from '@/models';

import { REVIEW_DTO } from '../constant';

export const ReviewRequestDto = {
  reviewId() {
    return applyDecorators(ReviewDoc.reviewId(), SwaggerValidation.id());
  },

  content() {
    return applyDecorators(ReviewDoc.content(), ReviewValidation.content());
  },

  imageUrl() {
    return applyDecorators(ReviewDoc.imageUrl(), ReviewValidation.imageUrl());
  },

  rating() {
    return applyDecorators(ReviewDoc.rating(), ReviewValidation.rating());
  },

  sort() {
    return applyDecorators(
      ApiPropertyOptional({
        description: REVIEW_DTO.SORT.KR,
        example: ReviewSort.RATING_DESC,
      }),
      ValidateIf((value) => value === ''),
      IsEnum(ReviewSort, {
        message: `지원하지 않는 ${REVIEW_DTO.SORT.KR}입니다.`,
      }),
    );
  },
};
