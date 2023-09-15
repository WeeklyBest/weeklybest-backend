import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from '@/models';
import { CurrentUser, JwtAuthGuard } from '@/modules/auth';

import { UserSummary } from './dtos';

@ApiTags('회원 API')
@Controller('users')
export class UsersController {
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: User) {
    return new UserSummary(user);
  }
}
