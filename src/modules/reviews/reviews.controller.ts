import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

import { User } from '@/models';

import { CurrentUser, JwtAuthGuard } from '../auth';

import { CreateReviewRequest } from './dtos';

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
}
