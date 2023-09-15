import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const SwaggerDoc = {
  id(description: string) {
    return applyDecorators(
      ApiProperty({
        description: '식별자',
        example: 1,
        required: true,
      }),
    );
  },
};
