import { UserRequestDto } from '../decorators';

export class ChangePasswordForm {
  @UserRequestDto.password()
  currentPassword: string;

  @UserRequestDto.password()
  newPassword: string;

  @UserRequestDto.password()
  confirmNewPassword: string;
}
