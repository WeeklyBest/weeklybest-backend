import { applyDecorators } from '@nestjs/common';

import { OrderDoc } from '@/docs';

export const OrderResponseDto = {
  orderId() {
    return applyDecorators(OrderDoc.orderId());
  },

  totalPrice() {
    return applyDecorators(OrderDoc.totalPrice());
  },

  paymentReal() {
    return applyDecorators(OrderDoc.paymentReal());
  },

  point() {
    return applyDecorators(OrderDoc.point());
  },

  purchaser() {
    return applyDecorators(OrderDoc.purchaser());
  },

  purchaserPhone() {
    return applyDecorators(OrderDoc.purchaserPhone());
  },

  purchaserEmail() {
    return applyDecorators(OrderDoc.purchaserEmail());
  },

  recipient() {
    return applyDecorators(OrderDoc.recipient());
  },

  recipientPhone() {
    return applyDecorators(OrderDoc.recipientPhone());
  },

  postalCode() {
    return applyDecorators(OrderDoc.postalCode());
  },

  shippingAddress() {
    return applyDecorators(OrderDoc.shippingAddress());
  },

  message() {
    return applyDecorators(OrderDoc.message());
  },

  status() {
    return applyDecorators(OrderDoc.status());
  },

  paymentMethod() {
    return applyDecorators(OrderDoc.paymentMethod());
  },

  arrivedAt() {
    return applyDecorators(OrderDoc.arrivedAt());
  },

  paidAt() {
    return applyDecorators(OrderDoc.paidAt());
  },
};
