import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAuthGuard } from '@/modules/auth';
import { User } from '@/models';
import { UserSummary } from './dtos';

@Controller('users')
export class UsersController {
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: User) {
    console.log(user);
    return new UserSummary(user);
  }
}
