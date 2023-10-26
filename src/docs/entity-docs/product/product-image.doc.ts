import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';

export const ProductImageDoc = {
  productImageId() {
    return applyDecorators(SwaggerDoc.id('상품 이미지 식별자'));
  },

  url() {
    return applyDecorators(
      ApiProperty({
        description: '상품 이미지 URL',
        example: [
          'https://s3.ap-northeast-2.amazonaws.com/img.stibee.com/43159_1633018317.jpeg',
        ],
      }),
    );
  },

  order() {
    return applyDecorators(
      ApiProperty({
        description: '상품 이미지 순서',
        example: 0,
      }),
    );
  },
};
