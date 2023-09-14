import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { AuthConfig } from '@/configs';
import { CONFIG } from '@/constants';
import { User, UserRepository, UserRole } from '@/models';

import { AUTH, AUTH_ERROR } from './auth.constant';
import { JoinForm, OAuthRequest } from './dtos';
import { IJwtPayload } from './interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async join(joinForm: JoinForm): Promise<void> {
    const { email, password, name } = joinForm;

    const existsUser: User = await this.userRepository.findOne({
      where: { email },
    });

    if (existsUser) {
      throw new HttpException(
        AUTH_ERROR.DUPLICATE_EMAIL,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.userRepository.insert(
        this.userRepository.create({
          email,
          password: await bcrypt.hash(password, AUTH.SALT),
          name,
          role: UserRole.ADMIN,
        }),
      );
    } catch (error) {
      throw new HttpException(
        AUTH_ERROR.JOIN_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateLocalUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findWithPassword(email);

    this.checkAuthValidity(user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    delete user.password;

    if (!isPasswordValid) {
      throw new HttpException(
        AUTH_ERROR.BAD_AUTH_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async getUserIfRefreshTokenMatches(id: number, refreshToken: string) {
    const user = await this.userRepository.findWithRefreshToken(id);

    this.checkAuthValidity(user);

    const doesRefreshTokenMatch = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    this.checkAuthValidity(doesRefreshTokenMatch);
    delete user.refreshToken;

    return user;
  }

  generateAccessToken({ id }: IJwtPayload) {
    const payload: IJwtPayload = { id };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<AuthConfig>(CONFIG.AUTH).accessTokenSecret,
      expiresIn: this.configService.get<AuthConfig>(CONFIG.AUTH)
        .accessTokenExpiresIn,
    });
  }

  async generateRefreshToken({ id }: IJwtPayload): Promise<string> {
    const payload: IJwtPayload = { id };

    try {
      const refreshToken = this.jwtService.sign(payload, {
        secret: this.configService.get<AuthConfig>(CONFIG.AUTH)
          .refreshTokenSecret,
        expiresIn: this.configService.get<AuthConfig>(CONFIG.AUTH)
          .refreshTokenExpiresIn,
      });

      const hashedRefreshToken = await bcrypt.hash(refreshToken, AUTH.SALT);

      const result = await this.userRepository.update(id, {
        refreshToken: hashedRefreshToken,
      });

      if (result.affected === 0) {
        throw new Error();
      }

      return refreshToken;
    } catch (error) {
      throw new HttpException(
        AUTH_ERROR.JWT_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOAuthUser(oAuthRequest: OAuthRequest): Promise<User> {
    const existsUser: User = await this.userRepository.findOne({
      where: { email: oAuthRequest.email },
    });

    if (!existsUser) return null;

    this.checkOAuthInfo(existsUser, oAuthRequest);

    return existsUser;
  }

  private checkOAuthInfo(user: User, { provider, snsId }: OAuthRequest) {
    if (user.provider !== provider || user.snsId != snsId) {
      throw new HttpException(
        AUTH_ERROR.MISMATCHED_SNS_INFO,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async oAuthJoin(oAuthRequest: OAuthRequest): Promise<User> {
    try {
      return this.userRepository.save(this.userRepository.create(oAuthRequest));
    } catch (error) {
      throw new HttpException(
        AUTH_ERROR.JOIN_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private checkAuthValidity(condition: any) {
    if (!!!condition) {
      throw new HttpException(
        AUTH_ERROR.BAD_AUTH_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
