import { OrderDetail } from '@/models';

import { VariantRequestDto } from '@/modules/products';

import { OrderDetailRequestDto } from '../decorators';

export class OrderDetailRequest {
  @OrderDetailRequestDto.price()
  price: number;

  @OrderDetailRequestDto.quantity()
  quantity: number;

  @VariantRequestDto.variantId()
  variantId: number;

  static toEntity(orderDetail: OrderDetailRequest) {
    const entity = new OrderDetail();
    entity.price = orderDetail.price;
    entity.quantity = orderDetail.quantity;
    entity.variantId = orderDetail.variantId;

    return entity;
  }
}
