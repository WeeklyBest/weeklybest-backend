import { SwaggerDoc, maskUsername } from '@/common';
import { Question, User } from '@/models';

import { UserResponseDto } from '@/modules/users/dtos/decorators';
import { ProductResponseDto } from '@/modules/products/dtos/decorators';

import { QuestionResponseDto } from '../decorators';

export class QuestionResponse {
  @QuestionResponseDto.questionId()
  id: number;

  @QuestionResponseDto.title()
  title: string;

  @QuestionResponseDto.content()
  content: string;

  @UserResponseDto.userId()
  userId: number;

  @QuestionResponseDto.username()
  username: string;

  @QuestionResponseDto.isPrivate()
  isPrivate: boolean;

  @ProductResponseDto.productId()
  productId: number;

  @ProductResponseDto.name()
  productName: string;

  @SwaggerDoc.createdAt()
  createdAt: Date;

  @SwaggerDoc.updatedAt()
  updatedAt: Date;

  constructor(question: Question, user?: User) {
    this.id = question.id;

    this.title = question.title;

    this.userId = question.user.id;
    this.username = maskUsername(question.user.name);

    this.isPrivate = question.isPrivate;

    // 비밀글 처리
    if (!this.isPrivate || (user && user.id === this.userId)) {
      this.content = question.content;
    }

    this.productId = question.productId;
    this.productName = question.product.name;

    this.createdAt = question.createdAt;
    this.updatedAt = question.updatedAt;
  }
}
