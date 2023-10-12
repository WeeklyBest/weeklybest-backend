import { OrderRequestDto } from '../decorators';

export class OrderIdParam {
  @OrderRequestDto.orderId()
  id: number;
}
