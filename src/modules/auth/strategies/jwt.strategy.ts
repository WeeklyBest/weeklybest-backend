import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthConfig } from '@/configs';
import { CONFIG } from '@/constants';
import { UsersService } from '@/modules/users';

import { STRATEGY } from '../auth.constant';
import { IJwtPayload } from '../interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, STRATEGY.JWT) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<AuthConfig>(CONFIG.AUTH).accessTokenSecret,
    });
  }

  async validate(payload: IJwtPayload) {
    return this.usersService.getUserById(payload.id);
  }
}
