import { CartItemResponseDto } from '../decorators';

export class AddCartItemResponse {
  @CartItemResponseDto.cartItemId()
  id: number;

  @CartItemResponseDto.addCartItemMessage()
  message?: string;
}
