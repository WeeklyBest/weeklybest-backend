import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from '@/models';

import { CurrentUser, JwtAuthGuard } from '../auth';

import { CreateQuestionRequest } from './dtos';

import { QuestionsControllerDoc as Doc } from './controller.doc';
import { QuestionsService } from './questions.service';

@ApiTags('문의 API')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Doc.registerQuestion('상품 문의 등록')
  @Post()
  @UseGuards(JwtAuthGuard)
  async registerQuestion(
    @Body() dto: CreateQuestionRequest,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.questionsService.registerQuestion(dto, user);
  }
}
