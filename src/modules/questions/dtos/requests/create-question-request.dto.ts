import { ProductRequestDto } from '@/modules/products/dtos/decorators';

import { QuestionRequestDto } from '../decorators';

export class CreateQuestionRequest {
  @QuestionRequestDto.title()
  title: string;

  @QuestionRequestDto.content()
  content: string;

  @QuestionRequestDto.isPrivate()
  isPrivate: boolean;

  @ProductRequestDto.productId()
  productId: number;
}
