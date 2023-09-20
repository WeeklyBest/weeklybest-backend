import { SwaggerDoc } from '@/common';
import { OrderDoc } from '@/docs';
import { Order, OrderStatus, PaymentMethod } from '@/models';

export class OrderResponse {
  @SwaggerDoc.id('주문 식별자')
  id: number;

  @OrderDoc.totalPrice()
  totalPrice: number;

  @OrderDoc.discount()
  discount: number;

  @OrderDoc.recipient()
  recipient: string;

  @OrderDoc.recipientPhone()
  recipientPhone: string;

  @OrderDoc.postalCode()
  postalCode: string;

  @OrderDoc.shippingAddress()
  shippingAddress: string;

  @OrderDoc.message()
  message: string;

  @OrderDoc.status()
  status: OrderStatus;

  @OrderDoc.paymentMethod()
  paymentMethod: PaymentMethod;

  @OrderDoc.arrivedAt()
  arrivedAt: Date;

  @OrderDoc.paidAt()
  paidAt: Date;

  @SwaggerDoc.createdAt()
  createdAt: Date;

  @SwaggerDoc.updatedAt()
  updatedAt: Date;

  constructor(order: Order) {
    this.id = order.id;
    this.totalPrice = order.totalPrice;
    this.discount = order.discount;
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