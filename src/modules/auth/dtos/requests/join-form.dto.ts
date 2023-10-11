// 순환 의존성 문제로 인해 직접 참조
import { UserRequestDto } from '@/modules/users/dtos/decorators';

export class JoinForm {
  @UserRequestDto.email()
  email: string;

  @UserRequestDto.password()
  password: string;

  @UserRequestDto.name()
  name: string;
}
