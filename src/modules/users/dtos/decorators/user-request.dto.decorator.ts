import { applyDecorators } from '@nestjs/common';

import { SwaggerValidation } from '@/common';
import { UserDoc } from '@/docs';
import { UserValidation } from '@/models';

export const UserRequestDto = {
  userId() {
    return applyDecorators(UserDoc.userId(), SwaggerValidation.id());
  },

  email() {
    return applyDecorators(UserDoc.email(), UserValidation.email());
  },

  password() {
    return applyDecorators(UserDoc.password(), UserValidation.password());
  },

  name() {
    return applyDecorators(UserDoc.name(), UserValidation.name());
  },

  phone() {
    return applyDecorators(UserDoc.phone(), UserValidation.phone());
  },

  point() {
    return applyDecorators(UserDoc.point(), UserValidation.point());
  },

  provider() {
    return applyDecorators(UserDoc.provider(), UserValidation.provider());
  },

  snsId() {
    return applyDecorators(UserDoc.snsId(), UserValidation.snsId());
  },
};
