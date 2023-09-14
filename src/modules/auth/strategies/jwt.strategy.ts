import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthConfig } from '@/configs';
import { CONFIG } from '@/constants';

import { STRATEGY } from '../auth.constant';
import { AuthService } from '../auth.service';
import { IJwtPayload } from '../interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, STRATEGY.JWT) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<AuthConfig>(CONFIG.AUTH).accessTokenSecret,
    });
  }

  async validate(payload: IJwtPayload) {
    return this.authService.validateJwtUser(payload.id);
  }
}
