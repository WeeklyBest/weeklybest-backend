import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Profile, Strategy } from 'passport-kakao';

import { AuthConfig } from '@/configs';
import { CONFIG } from '@/constants';
import { SNSProvider } from '@/models';

import { STRATEGY } from '../auth.constant';
import { AuthService } from '../auth.service';
import { OAuthRequest } from '../dtos';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, STRATEGY.KAKAO) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<AuthConfig>(CONFIG.AUTH).kakaoRestApiKey,
      clientSecret: configService.get<AuthConfig>(CONFIG.AUTH).kakaoCallbackUrl,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, username, _json } = profile;
    const { email } = _json.kakao_account;

    const oAuthRequest: OAuthRequest = {
      email,
      name: username,
      provider: SNSProvider.KAKAO,
      snsId: id,
    };

    const user = await this.authService.getOAuthUser(oAuthRequest);

    console.log(user);

    return user;
  }
}
