import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthConfig } from '@/configs';
import { CONFIG } from '@/constants';
import { UserRole } from '@/models';

import { UsersService } from '@/modules/users';

import { STRATEGY } from '../auth.constant';

import { IJwtPayload } from '../interface';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, STRATEGY.ADMIN) {
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
    const user = await this.usersService.getUserById(payload.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException('액세스 권한이 없습니다.');
    }

    return user;
  }
}
