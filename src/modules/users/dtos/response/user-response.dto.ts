import { Exclude, Expose, plainToInstance } from 'class-transformer';

import { SwaggerDoc } from '@/common';
import { SNSProvider, User, UserRole } from '@/models';

import { UserResponseDto } from '../decorators';

@Exclude()
export class UserResponse {
  @UserResponseDto.userId()
  @Expose()
  id: number;

  @UserResponseDto.email()
  @Expose()
  email: string;

  @UserResponseDto.name()
  @Expose()
  name: string;

  @UserResponseDto.phone()
  @Expose()
  phone: string;

  @UserResponseDto.role()
  @Expose()
  role: UserRole;

  @UserResponseDto.provider()
  @Expose()
  provider: SNSProvider;

  @UserResponseDto.snsId()
  @Expose()
  snsId: string;

  @SwaggerDoc.createdAt()
  @Expose()
  createdAt: Date;

  @SwaggerDoc.updatedAt()
  @Expose()
  updatedAt: Date;

  constructor(user: User) {
    Object.assign(this, plainToInstance(UserResponse, user));
  }
}
