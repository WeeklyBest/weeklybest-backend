import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const AddressesControllerDoc = {
  register(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '주소 및 수령인 정보를 서버에 등록합니다.',
      }),
    );
  },

  remove(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '주소 정보를 삭제합니다.',
      }),
    );
  },
};
