import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const AuthResponseDto = {
  accessToken() {
    return applyDecorators(
      ApiProperty({
        example: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9',
        description: 'JWT Access 토큰',
      }),
    );
  },
};
