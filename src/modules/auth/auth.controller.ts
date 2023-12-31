import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

import { CookieOptions, Response } from 'express';

import { removeCookie } from '@/common';
import { AuthConfig } from '@/configs';
import { CONFIG, COOKIE } from '@/constants';
import { User } from '@/models';

import { CurrentUser } from './decorators';
import { JoinForm, LoginResponse } from './dtos';
import {
  JwtAuthGuard,
  JwtRefreshAuthGuard,
  KakaoAuthGuard,
  LocalAuthGuard,
  NaverAuthGuard,
} from './guards';
import { IJwtPayload } from './interface';

import { AuthService } from './auth.service';
import { AuthControllerDoc as Doc } from './controller.doc';

@ApiTags('인증/인가 API')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Doc.join('회원가입')
  @Post('join')
  async join(@Body() joinForm: JoinForm): Promise<void> {
    await this.authService.join(joinForm);
  }

  @Doc.deleteLocalAccount('회원탈퇴')
  @Delete('local')
  @UseGuards(JwtAuthGuard)
  async deleteLocalAccount(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    await this.authService.deleteAccount(user);
    removeCookie(res, COOKIE.REFRESH_TOKEN, { httpOnly: true });
  }

  @Doc.login('로그인')
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    return this.issueTokens(user, res);
  }

  @Doc.logout('로그아웃')
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.removeRefreshToken(user.id);

    removeCookie(res, COOKIE.REFRESH_TOKEN, { httpOnly: true });
  }

  @Doc.kakao('카카오 회원가입/로그인')
  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  kakao(): void {
    // 카카오 아이디로 로그인
  }

  @Doc.kakaoCallback('카카오 OAuth 콜백')
  @Get('kakao/oauth')
  @UseGuards(KakaoAuthGuard)
  async kakaoCallback(@CurrentUser() user: User, @Res() res: Response) {
    await this.oAuthLogin(user, res);
  }

  @Doc.refresh('Access 토큰 갱신')
  @Get('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  refresh(@CurrentUser() user: User): LoginResponse {
    const jwtPayload: IJwtPayload = { id: user.id };
    const accessToken = this.authService.generateAccessToken(jwtPayload);

    return {
      accessToken,
    };
  }

  @Doc.naver('네이버 회원가입/로그인')
  @Get('naver')
  @UseGuards(NaverAuthGuard)
  naver(): void {
    // 네이버 아이디로 로그인
  }

  @Doc.naverCallback('네이버 OAuth 콜백')
  @Get('naver/oauth')
  @UseGuards(NaverAuthGuard)
  async naverCallback(@CurrentUser() user: User, @Res() res: Response) {
    await this.oAuthLogin(user, res);
  }

  private async setRefreshTokenCookie(payload: IJwtPayload, res: Response) {
    const refreshToken = await this.authService.generateRefreshToken(payload);
    const cookieOptions: CookieOptions = {
      maxAge:
        this.configService.get<AuthConfig>(CONFIG.AUTH).refreshTokenExpiresIn *
        1000,
      httpOnly: true,
      signed: true,
      // secure:
      //   this.configService.get(CONFIG.ENV_KEY.NODE_ENV) !==
      //   CONFIG.NODE_ENV.DEVELOPMENT,
    };

    res.cookie(COOKIE.REFRESH_TOKEN, refreshToken, cookieOptions);
  }

  private async issueTokens(user: User, res: Response): Promise<LoginResponse> {
    const jwtPayload: IJwtPayload = { id: user.id };
    const accessToken = this.authService.generateAccessToken(jwtPayload);
    await this.setRefreshTokenCookie(jwtPayload, res);

    return {
      accessToken,
    };
  }

  private async oAuthLogin(user: User, res: Response) {
    const { accessToken } = await this.issueTokens(user, res);

    const oAuthLoginRedirect = `${
      this.configService.get<AuthConfig>(CONFIG.AUTH).oAuthRedirectUrl
    }?token=${accessToken}`;

    res.redirect(oAuthLoginRedirect);
  }
}
