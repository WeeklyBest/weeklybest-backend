import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const SwaggerDoc = {
  id(description: string) {
    return applyDecorators(
      ApiProperty({
        description,
        example: 1,
      }),
    );
  },

  createdAt() {
    return applyDecorators(
      ApiPropertyOptional({
        example: '2023-09-10 18:00:32',
        description: '생성일',
      }),
    );
  },

  updatedAt() {
    return applyDecorators(
      ApiPropertyOptional({
        example: '2023-09-11 12:36:22',
        description: '수정일',
      }),
    );
  },
};
