import { CartItemRequestDto } from '../decorators';

export class CartItemIdParam {
  @CartItemRequestDto.cartItemId()
  id: number;
}
