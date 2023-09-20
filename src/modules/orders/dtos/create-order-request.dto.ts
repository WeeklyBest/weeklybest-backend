import { OrderDoc } from '@/docs';
import { Order, OrderStatus, PaymentMethod, User } from '@/models';

export class CreateOrderRequest {
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

  toEntity(user: User) {
    const entity = new Order();

    entity.totalPrice = this.totalPrice;
    entity.discount = this.discount;
    entity.recipient = this.recipient;
    entity.recipientPhone = this.recipientPhone;
    entity.postalCode = this.postalCode;
    entity.shippingAddress = this.shippingAddress;
    entity.message = this.message;
    entity.status = this.status;
    entity.paymentMethod = this.paymentMethod;
    entity.arrivedAt = this.arrivedAt;
    entity.paidAt = this.paidAt;
    entity.user = user;

    return entity;
  }
}
