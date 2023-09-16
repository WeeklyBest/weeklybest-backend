import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const OptionSetDocs = {
  name() {
    return applyDecorators(
      ApiProperty({
        description: '옵션세트 이름',
        example: '사이즈',
      }),
    );
  },

  inputType() {
    return applyDecorators(
      ApiPropertyOptional({
        description: '옵션 Input 종류',
        example: 'CHECKBOX',
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