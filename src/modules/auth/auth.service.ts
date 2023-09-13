import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { User, UserRepository, UserRole } from '@/models';

import { AUTH, AUTH_ERROR } from './auth.constant';
import { JoinForm } from './dtos';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from './interface';
import { AuthConfig } from '@/configs';
import { CONFIG } from '@/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async join(joinForm: JoinForm): Promise<void> {
    const { email, password, name, mobile } = joinForm;

    const exUser: User = await this.userRepository.findOne({
      where: { email },
    });

    if (exUser) {
      throw new HttpException(
        AUTH_ERROR.DUPLICATE_EMAIL,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.userRepository.save(
        this.userRepository.create({
          email,
          password: await bcrypt.hash(password, AUTH.SALT),
          name,
          mobile,
          role: UserRole.USER,
        }),
      );
    } catch (err) {
      throw new HttpException(
        AUTH_ERROR.JOIN_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateLocalUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findWithPassword(email);

    if (!user) {
      throw new HttpException(
        AUTH_ERROR.BAD_LOGIN_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

    console.log(user);
    console.log(password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    delete user.password;

    if (!isPasswordValid) {
      throw new HttpException(
        AUTH_ERROR.BAD_LOGIN_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

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
          .accessTokenSecret,
        expiresIn: this.configService.get<AuthConfig>(CONFIG.AUTH)
          .accessTokenExpiresIn,
      });

      const result = await this.userRepository.update(id, {
        refreshToken,
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
}
