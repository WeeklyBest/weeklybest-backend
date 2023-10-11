import { SwaggerDoc, maskUsername } from '@/common';
import { Review } from '@/models';

import { ReviewResponseDto } from '../decorators';

export class ReviewResponse {
  @ReviewResponseDto.reviewId()
  id: number;

  @ReviewResponseDto.content()
  content: string;

  @ReviewResponseDto.imageUrl()
  imageUrl: string;

  @ReviewResponseDto.rating()
  rating: number;

  @SwaggerDoc.createdAt()
  createdAt: Date;

  @SwaggerDoc.updatedAt()
  updatedAt: Date;

  @ReviewResponseDto.authorId()
  authorId: number;

  @ReviewResponseDto.author()
  author: string;

  constructor(review: Review) {
    this.id = review.id;
    this.content = review.content;
    this.imageUrl = review.imageUrl;
    this.rating = review.rating;
    this.createdAt = review.createdAt;
    this.updatedAt = review.updatedAt;
    this.authorId = review.user.id;
    this.author = maskUsername(review.user.name);
  }
}
