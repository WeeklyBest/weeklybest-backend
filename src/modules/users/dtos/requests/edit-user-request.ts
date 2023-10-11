import { IsOptional } from 'class-validator';

import { UserRequestDto } from '../decorators';

export class EditUserRequest {
  @UserRequestDto.name()
  @IsOptional()
  name: string;

  @UserRequestDto.phone()
  @IsOptional()
  phone: string;
}
