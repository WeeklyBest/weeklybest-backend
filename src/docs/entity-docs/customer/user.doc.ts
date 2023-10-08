import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Column } from 'typeorm';

import { SNSProvider, USER } from '@/models';

export const UserDoc = {
  userId() {
    return applyDecorators();
  },

  email() {
    return applyDecorators(
      ApiProperty({
        description: USER.EMAIL.KR,
        example: 'admin@example.com',
      }),
    );
  },

  password() {
    return applyDecorators(
      ApiProperty({
        description: USER.PASSWORD.KR,
        example: 'Admin1234!',
      }),
    );
  },

  name() {
    return applyDecorators(
      ApiProperty({
        description: '회원의 실명',
        example: '관리자',
      }),
    );
  },

  phone() {
    return applyDecorators(
      ApiProperty({
        description: USER.PHONE.KR,
        example: '01012345678',
      }),
    );
  },

  role() {
    return applyDecorators(
      ApiProperty({
        description: USER.ROLE.KR,
        example: 'USER',
      }),
    );
  },

  provider() {
    return applyDecorators(
      Column({
        length: USER.PROVIDER.MAX_LENGTH,
        default: SNSProvider.LOCAL,
      }),
    );
  },

  snsId() {
    return applyDecorators(
      Column({
        nullable: true,
      }),
    );
  },

  refreshToken() {
    return applyDecorators(
      Column({
        nullable: true,
        select: false,
      }),
    );
  },
};
