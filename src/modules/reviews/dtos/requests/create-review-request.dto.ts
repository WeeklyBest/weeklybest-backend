import { ProductRequestDto } from '@/modules/products/dtos/decorators';

import { ReviewRequestDto } from '../decorators';

export class CreateReviewRequest {
  @ReviewRequestDto.content()
  content: string;

  @ReviewRequestDto.imageUrl()
  imageUrl: string;

  @ReviewRequestDto.rating()
  rating: number;

  @ProductRequestDto.productId()
  productId: number;
}
