import { QuestionRequestDto } from '../decorators';

export class QuestionIdParam {
  @QuestionRequestDto.questionId()
  id: number;
}
