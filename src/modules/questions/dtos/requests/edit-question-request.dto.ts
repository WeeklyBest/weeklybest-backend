import { IsOptional } from 'class-validator';

import { QuestionRequestDto } from '../decorators';

export class EditQuestionRequest {
  @QuestionRequestDto.title()
  @IsOptional()
  title: string;

  @QuestionRequestDto.content()
  @IsOptional()
  content: string;

  @QuestionRequestDto.isPrivate()
  @IsOptional()
  isPrivate: boolean;
}
