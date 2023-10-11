import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PagingQuery } from '@/common';
import { User } from '@/models';

import { CurrentUser, JwtAuthGuard } from '@/modules/auth';

import { EditUserRequest, UserResponse, ChangePasswordForm } from './dtos';

import { UsersControllerDoc as Doc } from './controller.doc';
import { UsersService } from './users.service';

@ApiTags('회원 API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Doc.editUserInfo('본인 정보 수정')
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async editUserInfo(@Body() dto: EditUserRequest, @CurrentUser() user: User) {
    await this.usersService.editUserInfo(dto, user);
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
    return this.usersService.getMyWishlist(user, { pageNum, pageSize });
  }

  @Doc.changePassword('비밀번호 변경')
  @Patch('me/change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Body() dto: ChangePasswordForm,
    @CurrentUser() user: User,
  ) {
    await this.usersService.changePassword(dto, user);
  }

  @Doc.getMyQuestions('내 문의 목록 조회')
  @Get('me/questions')
  @UseGuards(JwtAuthGuard)
  async getMyQuestions(
    @CurrentUser() user: User,
    @Query() { pageNum = 1, pageSize = 5 }: PagingQuery,
  ) {
    return this.usersService.getMyQuestions(user, { pageNum, pageSize });
  }

  @Doc.getMyReviews('내 후기 목록 조회')
  @Get('me/reviews')
  @UseGuards(JwtAuthGuard)
  async getMyReviews(
    @CurrentUser() user: User,
    @Query() { pageNum = 1, pageSize = 5 }: PagingQuery,
  ) {
    return this.usersService.getMyReviews(user, { pageNum, pageSize });
  }
}
