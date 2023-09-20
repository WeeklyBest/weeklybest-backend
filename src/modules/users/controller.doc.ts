import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const UsersControllerDoc = {
  getMe(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '로그인된 회원 본인의 요약된 정보를 가져옵니다.',
      }),
    );
  },
};