import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const SizeValueDocs = {
  label() {
    return applyDecorators(
      ApiProperty({
        description: '사이즈 값 라벨',
        example: 'XS',
      }),
    );
  },
};
