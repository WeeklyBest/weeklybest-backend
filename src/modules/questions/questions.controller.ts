import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from '@/models';

import { CurrentUser, JwtAuthGuard, JwtAuthOrGuestGuard } from '../auth';

import {
  CreateQuestionRequest,
  EditQuestionRequest,
  QuestionIdParam,
  QuestionResponse,
} from './dtos';

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

  @Doc.getQuestion('상품 문의 조회')
  @Get(':id')
  @UseGuards(JwtAuthOrGuestGuard)
  async getQuestion(
    @Param() { id }: QuestionIdParam,
    @CurrentUser() user: User,
  ): Promise<QuestionResponse> {
    return this.questionsService.getQuestion(id, user);
  }

  @Doc.editQuestion('상품 문의 수정')
  @Patch(':id')
  @UseGuards(JwtAuthOrGuestGuard)
  async editQuestion(
    @Param() { id }: QuestionIdParam,
    @Body() dto: EditQuestionRequest,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.questionsService.editQuestion(id, dto, user);
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
