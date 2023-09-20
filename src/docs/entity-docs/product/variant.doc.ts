import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const VariantDoc = {
  quantity() {
    return applyDecorators(
      ApiProperty({
        description: '재고 수량',
        example: 100,
      }),
    );
  },

  hide() {
    return applyDecorators(
      ApiPropertyOptional({
        description: '품목 표시 여부',
        example: false,
      }),
    );
  },
};
