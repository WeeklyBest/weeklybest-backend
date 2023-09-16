import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const OptionValueDocs = {
  name() {
    return applyDecorators(
      ApiProperty({
        description: '옵션값 이름',
        example: '사이즈',
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
};
