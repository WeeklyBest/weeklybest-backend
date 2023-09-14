import { Entity, Index } from 'typeorm';

import { CommonEntity } from '@/common';
import { UserDocs } from '@/docs';
import { SNSProvider, UserRole } from '@/models';

@Index('email', ['email'], { unique: true })
@Entity()
export class User extends CommonEntity {
  @UserDocs.id()
  id: number;

  @UserDocs.email()
  email: string;

  @UserDocs.password()
  password: string;

  @UserDocs.name()
  name: string;

  @UserDocs.role()
  role: UserRole;

  @UserDocs.provider()
  provider: SNSProvider;

  @UserDocs.snsId()
  snsId: string;

  @UserDocs.refreshToken()
  refreshToken: string;
}
