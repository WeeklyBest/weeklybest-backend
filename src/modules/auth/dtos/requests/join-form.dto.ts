import { UserDocs } from '@/docs';

export class JoinForm {
  @UserDocs.email()
  email: string;

  @UserDocs.password()
  password: string;

  @UserDocs.name()
  name: string;
}
