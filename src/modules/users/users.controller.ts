import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from '@/models';
import { CurrentUser, JwtAuthGuard } from '@/modules/auth';

import { UserResponse } from './dtos';
import { UsersControllerDocs as Docs } from './users.controller.docs';

@ApiTags('회원 API')
@Controller('users')
export class UsersController {
  @Docs.getMe('본인 정보 조회')
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: User) {
    return new UserResponse(user);
  }
}
