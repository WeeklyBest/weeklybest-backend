import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';

export const CategoryDocs = {
  categoryId() {
    return applyDecorators(SwaggerDoc.id('카테고리 식별자'));
  },

  name() {
    return applyDecorators(
      ApiProperty({
        description: '상품 그룹명',
        example: 'OUTER',
        required: true,
      }),
    );
  },

  code() {
    return applyDecorators(
      ApiProperty({
        description: '상품 그룹 코드',
        example: 'outer',
        required: true,
      }),
    );
  },
};
