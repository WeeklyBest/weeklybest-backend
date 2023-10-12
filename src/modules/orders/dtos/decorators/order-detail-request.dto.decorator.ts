import { applyDecorators } from '@nestjs/common';

import { OrderDetailDoc } from '@/docs';
import { OrderDetailValidation } from '@/models';

export const OrderDetailRequestDto = {
  price() {
    return applyDecorators(
      OrderDetailDoc.price(),
      OrderDetailValidation.price(),
    );
  },

  quantity() {
    return applyDecorators(
      OrderDetailDoc.quantity(),
      OrderDetailValidation.quantity(),
    );
  },
};
