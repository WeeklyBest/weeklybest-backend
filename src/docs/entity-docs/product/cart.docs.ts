import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const CartDocs = {
  quantity() {
    return applyDecorators(
      ApiProperty({
        description: '수량',
        example: 1,
      }),
    );
  },
};
