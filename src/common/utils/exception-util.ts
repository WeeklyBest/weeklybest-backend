import { NotFoundException } from '@nestjs/common';

import { IErrorObject } from '@/docs';

export function checkExistence(isExist: boolean, description: IErrorObject) {
  if (!isExist) {
    throw new NotFoundException(description);
  }
}
