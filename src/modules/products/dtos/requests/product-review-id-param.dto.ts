import { ReviewRequestDto } from '@/modules/reviews/dtos/decorators';

import { ProductIdParam } from './product-id-param.dto';

export class ProductReviewIdParam extends ProductIdParam {
  @ReviewRequestDto.reviewId()
  reviewId: number;
}
