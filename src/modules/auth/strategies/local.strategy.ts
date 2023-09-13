import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

import { CONFIG } from '@/constants';
import { User } from '@/models';
import { AuthConfig } from '@/configs/auth.config';

import { STRATEGY } from '../auth.constant';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, STRATEGY.LOCAL) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      usernameField: configService.get<AuthConfig>(CONFIG.AUTH).usernameField,
    });
  }

  async validate(email: string, password: string): Promise<User> {
    return this.authService.validateLocalUser(email, password);
  }
}
