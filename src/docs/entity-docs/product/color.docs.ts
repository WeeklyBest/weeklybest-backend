import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const ColorDocs = {
  label() {
    return applyDecorators(
      ApiProperty({
        description: '색상 라벨',
        example: '블랙',
      }),
    );
  },

  hexCode() {
    return applyDecorators(
      ApiProperty({
        description: '색상 코드',
        example: '000000',
      }),
    );
  },
};
