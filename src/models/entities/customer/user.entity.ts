import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { CommonEntity } from '@/common';
import { USER } from '@/models/constants';
import { SNSProvider, UserRole } from '@/models/enums';

@Index('email', ['email'], { unique: true })
@Entity()
export class User extends CommonEntity {
  @ApiProperty({
    description: '아이디',
    example: '1',
    required: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '이메일',
    example: 'Admin1234@example.com',
    required: true,
  })
  @IsEmail({}, { message: USER.EMAIL.MESSAGE.IS_EMAIL })
  @IsNotEmpty({ message: USER.EMAIL.MESSAGE.IS_NOT_EMPTY })
  @MaxLength(USER.EMAIL.MAX_LENGTH)
  @Column({
    unique: true,
    length: USER.EMAIL.MAX_LENGTH,
  })
  email: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'Admin1234!',
  })
  @IsNotEmpty({ message: USER.PASSWORD.MESSAGE.IS_NOT_EMPTY })
  @Matches(USER.PASSWORD.MATCHES, {
    message: USER.PASSWORD.MESSAGE.IS_PASSWORD,
  })
  @Length(USER.PASSWORD.MIN_LENGTH, USER.PASSWORD.MAX_LENGTH)
  @Column({
    length: USER.PASSWORD.MAX_LENGTH,
    nullable: true,
    select: false,
  })
  password: string;

  @ApiProperty({
    description: '회원의 실명',
    example: '관리자',
    required: true,
  })
  @Length(USER.NAME.MIN_LENGTH, USER.NAME.MAX_LENGTH)
  @Column({
    length: USER.NAME.MAX_LENGTH,
  })
  name: string;

  @ApiProperty({
    description: '휴대폰 번호',
    example: '01012345678',
    required: true,
  })
  @Matches(USER.MOBILE.MATCHES, {
    message: USER.MOBILE.MESSAGE.IS_PHONE,
  })
  @Column()
  mobile: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: SNSProvider,
    default: SNSProvider.LOCAL,
  })
  provider: SNSProvider;

  @Column({
    nullable: true,
  })
  snsId: string;

  @Column({
    nullable: true,
    select: false,
  })
  refreshToken: string;
}