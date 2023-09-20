import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';

import { User } from '@/models';

import { CurrentUser, JwtAuthGuard } from '../auth';

import { CreateReviewRequest, ReviewIdParam } from './dtos';

import { ReviewControllerDoc as Doc } from './controller.doc';

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

  @Doc.remove('리뷰 삭제')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param() { id }: ReviewIdParam,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.reviewsService.remove(id, user);
  }
}
