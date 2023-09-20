import { SwaggerDoc } from '@/common';
import { ReviewDoc } from '@/docs';

export class ReviewResponse {
  @SwaggerDoc.id('리뷰 식별자')
  id: number;

  @ReviewDoc.content()
  content: string;

  @ReviewDoc.imageUrl()
  imageUrl: string;

  @ReviewDoc.rating()
  rating: number;

  @SwaggerDoc.createdAt()
  createdAt: Date;

  @SwaggerDoc.updatedAt()
  updatedAt: Date;
}
