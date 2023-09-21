import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from '@/models';

import { CurrentUser, JwtAuthGuard } from '../auth';

import { CreateQuestionRequest, QuestionIdParam } from './dtos';

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

  @Doc.removeQuestion('상품 문의 제거')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeQuestion(
    @Param() { id }: QuestionIdParam,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.questionsService.removeQuestion(id, user);
  }
}
