import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { TypeOrmCustomModule } from '@/common';
import { AuthConfig } from '@/configs';
import { CONFIG } from '@/constants';
import { UserRepository } from '@/models';
import { UsersModule } from '@/modules/users';

import { strategies } from './strategies';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmCustomModule.forFeature([UserRepository]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<AuthConfig>(CONFIG.AUTH).accessTokenSecret,
        signOptions: {
          expiresIn: configService.get<AuthConfig>(CONFIG.AUTH)
            .accessTokenExpiresIn,
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [Logger, AuthService, ...strategies],
})
export class AuthModule {}
