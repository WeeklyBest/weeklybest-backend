import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const OrderDetailDoc = {
  pricate() {
    return applyDecorators(
      ApiProperty({
        description: '가격',
        example: 10000,
      }),
    );
  },

  quantity() {
    return applyDecorators(
      ApiProperty({
        description: '수량',
        example: 1,
      }),
    );
  },
};
