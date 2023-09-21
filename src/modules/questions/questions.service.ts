import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { QUESTION_ERROR, Question, User } from '@/models';

import { CreateQuestionRequest } from './dtos';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async registerQuestion(
    { title, content, isPrivate, productId }: CreateQuestionRequest,
    user: User,
  ): Promise<void> {
    const newQuestion = await this.questionRepository.save(
      this.questionRepository.create({
        title,
        content,
        isPrivate,
        product: { id: productId },
        user,
      }),
    );

    if (!newQuestion) {
      throw new HttpException(
        QUESTION_ERROR.CREATE_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
