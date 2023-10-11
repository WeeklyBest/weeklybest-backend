import { SwaggerDoc } from '@/common';
import { Order, OrderStatus, PaymentMethod } from '@/models';

import { OrderResponseDto } from '../decorators';

export class OrderResponse {
  @OrderResponseDto.orderId()
  id: number;

  @OrderResponseDto.totalPrice()
  totalPrice: number;

  @OrderResponseDto.paymentReal()
  paymentReal: number;

  @OrderResponseDto.purchaser()
  purchaser: string;

  @OrderResponseDto.purchaserPhone()
  purchaserPhone: string;

  @OrderResponseDto.purchaserEmail()
  purchaserEmail: string;

  @OrderResponseDto.recipient()
  recipient: string;

  @OrderResponseDto.recipientPhone()
  recipientPhone: string;

  @OrderResponseDto.postalCode()
  postalCode: string;

  @OrderResponseDto.shippingAddress()
  shippingAddress: string;

  @OrderResponseDto.message()
  message: string;

  @OrderResponseDto.status()
  status: OrderStatus;

  @OrderResponseDto.paymentMethod()
  paymentMethod: PaymentMethod;

  @OrderResponseDto.arrivedAt()
  arrivedAt: Date;

  @OrderResponseDto.paidAt()
  paidAt: Date;

  @SwaggerDoc.createdAt()
  createdAt: Date;

  @SwaggerDoc.updatedAt()
  updatedAt: Date;

  constructor(order: Order) {
    this.id = order.id;
    this.totalPrice = order.totalPrice;
    this.paymentReal = order.paymentReal;

    this.purchaser = order.purchaser;
    this.purchaserPhone = order.purchaserPhone;
    this.purchaserEmail = order.purchaserEmail;

    this.recipient = order.recipient;
    this.recipientPhone = order.recipientPhone;
    this.postalCode = order.postalCode;
    this.shippingAddress = order.shippingAddress;
    this.message = order.message;

    this.status = order.status;
    this.paymentMethod = order.paymentMethod;

    this.arrivedAt = order.arrivedAt;
    this.paidAt = order.paidAt;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
  }
}
