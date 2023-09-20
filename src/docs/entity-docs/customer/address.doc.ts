import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const AddressDoc = {
  label() {
    return applyDecorators(
      ApiProperty({
        description: '주소 식별 라벨',
        example: '집',
      }),
    );
  },

  recipient() {
    return applyDecorators(
      ApiProperty({
        description: '수령인',
        example: '김회원',
      }),
    );
  },

  recipientPhone() {
    return applyDecorators(
      ApiProperty({
        description: '수령인 연락처',
        example: '01012345678',
      }),
    );
  },

  postalCode() {
    return applyDecorators(
      ApiProperty({
        description: '우편 번호',
        example: '12345',
      }),
    );
  },

  address() {
    return applyDecorators(
      ApiProperty({
        description: '기본 주소',
        example: '경남 김해시 김해대로1234번길 12-3',
      }),
    );
  },

  addressDetail() {
    return applyDecorators(
      ApiProperty({
        description: '상세 주소',
        example: '123호',
      }),
    );
  },

  isDefault() {
    return applyDecorators(
      ApiProperty({
        description: '기본 주소지 여부',
        example: true,
      }),
    );
  },
};
