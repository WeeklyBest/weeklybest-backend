import { Review } from '@/models';

import { ProductResponseDto } from '@/modules/products/dtos/decorators';

import { ReviewResponse } from './review-response.dto';

export class MyReviewResponse extends ReviewResponse {
  @ProductResponseDto.productId()
  productId: number;

  @ProductResponseDto.name()
  productName: string;

  @ProductResponseDto.thumbnail()
  productThumbnail: string;

  constructor(review: Review) {
    super(review);

    this.productId = review.product.id;
    this.productName = review.product.name;
    if (review.product.images.length > 0) {
      this.productThumbnail = review.product.images[0].url;
    }
  }
}
