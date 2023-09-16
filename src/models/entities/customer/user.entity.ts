import { Entity, Index } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { UserDocs as Docs } from '@/docs';
import { SNSProvider, UserRole } from '@/models';

@Index('email', ['email'], { unique: true })
@Entity()
export class User extends CommonIdEntity {
  @Docs.email()
  email: string;

  @Docs.password()
  password: string;

  @Docs.name()
  name: string;

  @Docs.role()
  role: UserRole;

  @Docs.provider()
  provider: SNSProvider;

  @Docs.snsId()
  snsId: string;

  @Docs.refreshToken()
  refreshToken: string;
}
