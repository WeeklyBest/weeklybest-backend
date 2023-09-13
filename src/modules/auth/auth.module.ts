import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/models';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { strategies } from './strategies';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, ...strategies],
})
export class AuthModule {}
