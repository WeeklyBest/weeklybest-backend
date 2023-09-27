import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PagingQuery } from '@/common';
import { User } from '@/models';

import { CurrentUser, JwtAuthGuard } from '@/modules/auth';

import { EditUserRequest, UserResponse } from './dtos';

import { UsersControllerDoc as Doc } from './controller.doc';
import { UsersService } from './users.service';

@ApiTags('회원 API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersSerivce: UsersService) {}

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async editUserInfo(@Body() dto: EditUserRequest, @CurrentUser() user: User) {
    await this.usersSerivce.editUserInfo(dto, user);
  }

  @Doc.getMe('본인 정보 조회')
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: User) {
    return new UserResponse(user);
  }

  @Doc.getMyWishlist('내 위시리스트 목록 조회')
  @Get('me/wishlist')
  @UseGuards(JwtAuthGuard)
  async getMyWishlist(
    @CurrentUser() user: User,
    @Query() { pageNum = 1, pageSize = 5 }: PagingQuery,
  ) {
    return this.usersSerivce.getMyWishlist(user, { pageNum, pageSize });
  }
}
