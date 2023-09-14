import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { STRATEGY } from '../auth.constant';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { CONFIG, COOKIE } from '@/constants';
import { AuthConfig } from '@/configs';

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
}
