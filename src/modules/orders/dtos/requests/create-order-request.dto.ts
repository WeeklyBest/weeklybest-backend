import { ArrayNotEmpty, IsOptional } from 'class-validator';

import { Order, User } from '@/models';

import { CartItemRequestDto } from '@/modules/cart';
import { ImpRequestDto } from '@/modules/payments';

import { OrderRequestDto } from '../decorators';

export class CreateOrderRequest {
  @OrderRequestDto.purchaser()
  purchaser: string;

  @OrderRequestDto.purchaserPhone()
  purchaserPhone: string;

  @OrderRequestDto.purchaserEmail()
  purchaserEmail: string;

  @OrderRequestDto.recipient()
  recipient: string;

  @OrderRequestDto.recipientPhone()
  recipientPhone: string;

  @OrderRequestDto.postalCode()
  postalCode: string;

  @OrderRequestDto.shippingAddress()
  shippingAddress: string;

  @OrderRequestDto.message()
  @IsOptional()
  message: string;

  @ImpRequestDto.impUID()
  impUID: string;

  @CartItemRequestDto.cartItemIds({ required: true })
  @ArrayNotEmpty()
  cartItemIds: number[];

  toEntity(user: User, totalPrice: number, paymentReal: number) {
    const entity = new Order();

    entity.totalPrice = totalPrice;
    entity.paymentReal = paymentReal;

    entity.purchaser = this.purchaser;
    entity.purchaserPhone = this.purchaserPhone;
    entity.purchaserEmail = this.purchaserEmail;

    entity.recipient = this.recipient;
    entity.recipientPhone = this.recipientPhone;
    entity.postalCode = this.postalCode;
    entity.shippingAddress = this.shippingAddress;
    entity.message = this.message;

    entity.user = user;

    return entity;
  }
}
