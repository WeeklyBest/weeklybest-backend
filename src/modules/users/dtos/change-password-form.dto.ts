import { UserDoc } from '@/docs';

export class ChangePasswordForm {
  @UserDoc.password()
  currentPassword: string;

  @UserDoc.password()
  newPassword: string;

  @UserDoc.password()
  confirmNewPassword: string;
}
