import { AuthResponseDto } from '../decorator';

export class LoginResponse {
  @AuthResponseDto.accessToken()
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
