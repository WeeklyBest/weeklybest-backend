import { applyDecorators } from '@nestjs/common';

import { OrderDetailDoc } from '@/docs';

export const OrderDetailResponseDec = {
  price() {
    return applyDecorators(OrderDetailDoc.price());
  },

  quantity() {
    return applyDecorators(OrderDetailDoc.quantity());
  },
};
