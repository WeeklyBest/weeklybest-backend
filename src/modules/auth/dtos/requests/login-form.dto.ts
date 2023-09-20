import { UserDocs } from '@/docs';

export class LoginForm {
  @UserDocs.email()
  email: string;

  @UserDocs.password()
  password: string;
}
