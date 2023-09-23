import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { Column } from 'typeorm';

import { SNSProvider, USER, UserRole } from '@/models';

export const UserDoc = {
  userId() {
    return applyDecorators();
  },

  email() {
    return applyDecorators(
      ApiProperty({
        description: '이메일',
        example: 'admin@example.com',
      }),
      IsEmail({}, { message: USER.EMAIL.MESSAGE.IS_EMAIL }),
      IsNotEmpty({ message: USER.EMAIL.MESSAGE.IS_NOT_EMPTY }),
      MaxLength(USER.EMAIL.MAX_LENGTH),
      Column({
        unique: true,
        length: USER.EMAIL.MAX_LENGTH,
      }),
    );
  },

  password() {
    return applyDecorators(
      ApiProperty({
        description: '비밀번호',
        example: 'Admin1234!',
      }),
      IsNotEmpty({ message: USER.PASSWORD.MESSAGE.IS_NOT_EMPTY }),
      Matches(USER.PASSWORD.MATCHES, {
        message: USER.PASSWORD.MESSAGE.IS_PASSWORD,
      }),
      Length(USER.PASSWORD.MIN_LENGTH, USER.PASSWORD.MAX_LENGTH),
      Column({
        length: USER.PASSWORD.MAX_LENGTH,
        nullable: true,
        select: false,
      }),
    );
  },

  name() {
    return applyDecorators(
      ApiProperty({
        description: '회원의 실명',
        example: '관리자',
      }),
      Length(USER.NAME.MIN_LENGTH, USER.NAME.MAX_LENGTH),
      Column({
        length: USER.NAME.MAX_LENGTH,
      }),
    );
  },

  phone() {
    return applyDecorators(
      ApiProperty({
        description: '휴대폰 번호',
        example: '01012345678',
      }),
      Length(USER.PHONE.MIN_LENGTH, USER.PHONE.MAX_LENGTH),
    );
  },

  role() {
    return applyDecorators(
      Column({
        type: 'char',
        length: USER.ROLE.MAX_LENGTH,
        default: UserRole.USER,
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
