import { ReviewRequestDto } from '../decorators';

export class EditReviewRequest {
  @ReviewRequestDto.content()
  content: string;

  @ReviewRequestDto.imageUrl()
  imageUrl: string;

  @ReviewRequestDto.rating()
  rating: number;
}
