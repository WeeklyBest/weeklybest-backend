import { ReviewRequestDto } from '../decorators';

export class ReviewIdParam {
  @ReviewRequestDto.reviewId()
  id: number;
}
