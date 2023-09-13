import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { COOKIE } from '@/constants';
import { User } from '@/models';

import { AuthService } from './auth.service';
import { Docs } from './controller.doc';
import { CurrentUser } from './decorators';
import { JoinForm, LoginResponse } from './dtos';
import { LocalAuthGuard } from './guards';
import { IJwtPayload } from './interface';

@ApiTags('인증/인가 API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Docs.join('회원가입')
  @Post('join')
  async join(@Body() joinForm: JoinForm): Promise<void> {
    await this.authService.join(joinForm);
  }

  @Docs.login('로그인')
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    const jwtPayload: IJwtPayload = { id: user.id };

    const accessToken = this.authService.generateAccessToken(jwtPayload);
    await this.setRefreshTokenCookie(jwtPayload, res);

    return { accessToken };
  }

  private async setRefreshTokenCookie(payload: IJwtPayload, res: Response) {
    const refreshToken = await this.authService.generateRefreshToken(payload);
    console.log(refreshToken);
    res.cookie(COOKIE.REFRESH_TOKEN, refreshToken);
  }
}
