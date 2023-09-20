import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { InternalOAuthError, Strategy } from 'passport-oauth2';

import { AuthConfig } from '@/configs';
import { CONFIG } from '@/constants';
import { SNSProvider } from '@/models';

import { OAuthRequest } from '../dtos';
import { INaverProfile, INaverProfileResponse } from '../interface';

import { STRATEGY } from '../auth.constant';
import { AuthService } from '../auth.service';

const PROVIDER_NAME = 'naver';
const AUTHORIZATION_URL = 'https://nid.naver.com/oauth2.0/authorize';
const TOKEN_URL = 'https://nid.naver.com/oauth2.0/token';
const PROFILE_URL = 'https://openapi.naver.com/v1/nid/me';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, STRATEGY.NAVER) {
  public _profileURL: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      authorizationURL: AUTHORIZATION_URL,
      tokenURL: TOKEN_URL,
      clientID: configService.get<AuthConfig>(CONFIG.AUTH).naverClientID,
      clientSecret: configService.get<AuthConfig>(CONFIG.AUTH)
        .naverClientSecret,
      callbackURL: configService.get<AuthConfig>(CONFIG.AUTH).naverCallbackUrl,
    });

    this.name = PROVIDER_NAME;
    this._profileURL = PROFILE_URL;
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: INaverProfile,
  ) {
    const { id, name, email } = profile;

    const oAuthRequest: OAuthRequest = {
      email,
      name,
      provider: SNSProvider.NAVER,
      snsId: id,
    };

    const user = await this.authService.getOAuthUser(oAuthRequest);

    if (!user) {
      return this.authService.oAuthJoin(oAuthRequest);
    }

    return user;
  }

  authorizationParams(options: any): object {
    const params = {} as any;

    if (options.authType) {
      params.auth_type = options.authType;
    }

    return params;
  }

  userProfile(
    accessToken: string,
    done: (err?: Error, profile?: any) => void,
  ): void {
    this._oauth2.get(this._profileURL, accessToken, (err: any, body: any) => {
      if (err) {
        return done(
          new InternalOAuthError(
            '네이버 회원 프로필 정보를 불러오지 못했습니다.',
            err,
          ),
        );
      }

      try {
        const parsedBody: INaverProfileResponse = JSON.parse(body);

        const { resultcode, message, response } = parsedBody;

        if (!(resultcode && message)) {
          return done(
            new InternalOAuthError('API 응답 정보(body)가 비어있습니다.', err),
          );
        }

        if (resultcode !== '00') {
          return done(
            new InternalOAuthError(
              '네이버 Open API에 문제가 발생했습니다.',
              err,
            ),
          );
        }

        const {
          id,
          nickname,
          name,
          email,
          gender,
          age,
          birthday,
          profile_image: profileImage,
          birthyear,
          mobile,
          mobile_e164: mobileE164,
        } = response;

        const profile: INaverProfile = {
          provider: PROVIDER_NAME,
          id,
          nickname,
          name,
          email,
          gender,
          age,
          birthday,
          profileImage,
          birthyear,
          mobile,
          mobileE164,
          _raw: body,
          _json: parsedBody,
        };

        done(null, profile);
      } catch (err) {
        return done(new InternalOAuthError('', err));
      }
    });
  }
}
