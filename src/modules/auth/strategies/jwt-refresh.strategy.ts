import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthConfig } from '@/configs';
import { CONFIG, COOKIE } from '@/constants';

import { IJwtPayload } from '../interface';

import { STRATEGY } from '../auth.constant';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  STRATEGY.JWT_REFRESH,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req?.signedCookies && req.signedCookies[COOKIE.REFRESH_TOKEN];
        },
      ]),
      secretOrKey: configService.get<AuthConfig>(CONFIG.AUTH)
        .refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: IJwtPayload) {
    const refreshToken =
      req.signedCookies && req.signedCookies[COOKIE.REFRESH_TOKEN];
    return this.authService.getUserIfRefreshTokenMatches(
      payload.id,
      refreshToken,
    );
  }
}
