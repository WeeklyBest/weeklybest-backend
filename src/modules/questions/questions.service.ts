import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { EXCEPTION } from '@/docs';
import { Question, User, UserRole } from '@/models';

import {
  CreateQuestionRequest,
  EditQuestionRequest,
  QuestionResponse,
} from './dtos';
import {
  Pagination,
  PagingQuery,
  getPagination,
  throwExceptionOrNot,
} from '@/common';

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
      throwExceptionOrNot(newQuestion, EXCEPTION.QUESTION.CREATE_ERROR);
    }
  }

  async getQuestion(id: number, user: User): Promise<QuestionResponse> {
    const question = await this.questionRepository.findOne({
      where: {
        id: id,
      },
      relations: ['user', 'product'],
    });

    throwExceptionOrNot(question, EXCEPTION.QUESTION.NOT_FOUND);

    const isAuthorized = this.authPrivateQuestion(question, user);
    throwExceptionOrNot(isAuthorized, EXCEPTION.QUESTION.FORBIDDEN);

    return new QuestionResponse(question);
  }

  async editQuestion(id: number, dto: EditQuestionRequest, user: User) {
    const result = await this.questionRepository.update(
      {
        id,
        user: { id: user.id },
      },
      dto,
    );

    throwExceptionOrNot(result.affected, EXCEPTION.QUESTION.UPDATE_ERROR);
  }

  async removeQuestion(id: number, user: User): Promise<void> {
    const result = await this.questionRepository.delete({
      id,
      user: { id: user.id },
    });

    throwExceptionOrNot(result.affected, EXCEPTION.QUESTION.DELETE_ERROR);
  }

  async getQuestionByProductId(
    productId: number,
    { pageNum, pageSize }: PagingQuery,
    user: User,
  ): Promise<Pagination<QuestionResponse>> {
    const [questions, count] = await this.questionRepository.findAndCount({
      relations: ['user', 'product'],
      where: {
        product: {
          id: productId,
        },
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: 'DESC',
      },
    });

    const questionList = questions.map(
      (question) => new QuestionResponse(question, user),
    );

    return getPagination(questionList, count, { pageNum, pageSize });
  }

  private authPrivateQuestion(question: Question, user: User) {
    return (
      question.isPrivate &&
      question.user.id !== user.id &&
      user.role !== UserRole.ADMIN
    );
  }
}
