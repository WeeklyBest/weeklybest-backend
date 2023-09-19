import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const OptionValueDocs = {
  value() {
    return applyDecorators(
      ApiProperty({
        description: '옵션값 이름',
        example: 'XL',
      }),
    );
  },

  additionalCharge() {
    return applyDecorators(
      ApiPropertyOptional({
        description: '품목 옵션 추가 금액',
        example: 5000,
      }),
    );
  },

  order() {
    return applyDecorators(
      ApiProperty({
        description: '정렬 순서 (0부터 시작)',
        example: 0,
      }),
    );
  },
};
