import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const OptionDocs = {
  label() {
    return applyDecorators(
      ApiProperty({
        description: '고객에게 노출될 옵션 라벨',
        example: '사이즈',
      }),
    );
  },

  description() {
    return applyDecorators(
      ApiProperty({
        description: '관리자에게 노출될 옵션 설명',
        example: '옷 사이즈 (XS/S/M/L/XL)',
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
