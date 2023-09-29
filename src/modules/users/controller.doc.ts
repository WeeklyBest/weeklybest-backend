import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const UsersControllerDoc = {
  editUserInfo(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '로그인된 회원의 개인 정보를 수정합니다.',
      }),
    );
  },

  getMe(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '로그인된 회원 본인의 요약된 정보를 가져옵니다.',
      }),
    );
  },

  getMyWishlist(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '로그인된 회원이 추가한 위시리스트를 가져옵니다.',
      }),
      ApiOkResponse({
        description: '내 위시리스트 목록 조회 성공',
      }),
    );
  },

  changePassword(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '로그인된 회원의 비밀번호를 변경합니다.',
      }),
    );
  },
};
