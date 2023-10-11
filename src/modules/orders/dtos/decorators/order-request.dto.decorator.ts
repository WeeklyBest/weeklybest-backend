import { applyDecorators } from '@nestjs/common';

import { SwaggerValidation } from '@/common';
import { OrderDoc } from '@/docs';
import { OrderValidation } from '@/models';

export const OrderRequestDto = {
  orderId() {
    return applyDecorators(OrderDoc.orderId(), SwaggerValidation.id());
  },

  purchaser() {
    return applyDecorators(OrderDoc.purchaser(), OrderValidation.purchaser());
  },

  purchaserPhone() {
    return applyDecorators(
      OrderDoc.purchaserPhone(),
      OrderValidation.purchaserPhone(),
    );
  },

  purchaserEmail() {
    return applyDecorators(
      OrderDoc.purchaserEmail(),
      OrderValidation.purchaserEmail(),
    );
  },

  recipient() {
    return applyDecorators(OrderDoc.recipient(), OrderValidation.recipient());
  },

  recipientPhone() {
    return applyDecorators(
      OrderDoc.recipientPhone(),
      OrderValidation.recipientPhone(),
    );
  },

  postalCode() {
    return applyDecorators(OrderDoc.postalCode(), OrderValidation.postalCode());
  },

  shippingAddress() {
    return applyDecorators(
      OrderDoc.shippingAddress(),
      OrderValidation.message(),
    );
  },

  message() {
    return applyDecorators(OrderDoc.message(), OrderValidation.message());
  },

  status() {
    return applyDecorators(OrderDoc.status(), OrderValidation.status());
  },

  paymentMethod() {
    return applyDecorators(
      OrderDoc.paymentMethod(),
      OrderValidation.paymentMethod(),
    );
  },

  arrivedAt() {
    return applyDecorators(OrderDoc.arrivedAt(), OrderValidation.arrivedAt());
  },

  paidAt() {
    return applyDecorators(OrderDoc.paidAt(), OrderValidation.paidAt());
  },
};
