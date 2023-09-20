import { UserDocs } from '@/docs';
import { SNSProvider } from '@/models';

export class OAuthRequest {
  @UserDocs.email()
  email: string;

  @UserDocs.name()
  name: string;

  @UserDocs.provider()
  provider: SNSProvider;

  @UserDocs.snsId()
  snsId: string;
}
