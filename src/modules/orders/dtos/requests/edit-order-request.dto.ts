import { IsOptional } from 'class-validator';

import { OrderStatus, PaymentMethod } from '@/models';

import { OrderRequestDto } from '../decorators';

export class EditOrderRequest {
  @OrderRequestDto.recipient()
  @IsOptional()
  recipient: string;
  @OrderRequestDto.recipientPhone()
  @IsOptional()
  recipientPhone: string;

  @OrderRequestDto.postalCode()
  @IsOptional()
  postalCode: string;
  @OrderRequestDto.shippingAddress()
  @IsOptional()
  shippingAddress: string;
  @OrderRequestDto.message()
  @IsOptional()
  message: string;

  @OrderRequestDto.status()
  @IsOptional()
  status: OrderStatus;

  @OrderRequestDto.paymentMethod()
  @IsOptional()
  paymentMethod: PaymentMethod;

  @OrderRequestDto.paidAt()
  @IsOptional()
  paidAt: Date;
}
