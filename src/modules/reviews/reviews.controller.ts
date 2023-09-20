import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { User } from '@/models';

import { CurrentUser, JwtAuthGuard } from '../auth';

import {
  CreateReviewRequest,
  EditReviewRequest,
  ReviewIdParam,
  ReviewResponse,
} from './dtos';

import { ReviewControllerDoc as Doc } from './controller.doc';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Doc.addReview('리뷰 등록')
  @Post()
  @UseGuards(JwtAuthGuard)
  async addReview(
    @Body() dto: CreateReviewRequest,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.reviewsService.addReview(dto, user);
  }

  @Doc.getReview('리뷰 조회')
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getReview(@Param() { id }: ReviewIdParam): Promise<ReviewResponse> {
    return this.reviewsService.getReview(id);
  }

  @Doc.editReview('리뷰 수정')
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async editReview(
    @Param() { id }: ReviewIdParam,
    @Body() dto: EditReviewRequest,
    @CurrentUser() user: User,
  ) {
    await this.reviewsService.editReview(id, dto, user);
  }

  @Doc.removeReview('리뷰 삭제')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeReview(
    @Param() { id }: ReviewIdParam,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.reviewsService.removeReview(id, user);
  }
}
