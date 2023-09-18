import { Exclude, Expose, plainToInstance } from 'class-transformer';

import { SwaggerDoc } from '@/common';
import { UserDocs } from '@/docs';
import { SNSProvider, User, UserRole } from '@/models';

@Exclude()
export class UserResponse {
  @SwaggerDoc.id()
  @Expose()
  id: number;

  @UserDocs.email()
  @Expose()
  email: string;

  @UserDocs.name()
  @Expose()
  name: string;

  @UserDocs.role()
  @Expose()
  role: UserRole;

  @UserDocs.provider()
  @Expose()
  provider: SNSProvider;

  @UserDocs.snsId()
  @Expose()
  snsId: string;

  constructor(user: User) {
    Object.assign(this, plainToInstance(UserResponse, user));
  }
}
