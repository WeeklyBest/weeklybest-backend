import { SwaggerDoc } from '@/common';
import { QuestionDoc } from '@/docs';
import { Question } from '@/models';

export class QuestionResponse {
  @SwaggerDoc.id('문의 식별자')
  id: number;

  @QuestionDoc.title()
  title: string;

  @QuestionDoc.content()
  content: string;

  @QuestionDoc.isPrivate()
  isPrivate: boolean;

  @SwaggerDoc.id('상품 식별자')
  productId: number;

  @SwaggerDoc.id('작성자 식별자')
  userId: number;

  constructor(question: Question) {
    this.id = question.id;
    this.title = question.title;
    this.content = question.content;
    this.isPrivate = question.isPrivate;

    this.productId = question.productId;
    this.userId = question.user.id;
  }
}
