import { CartRequestDto } from '../decorators';

export class EditCartItemRequest {
  @CartRequestDto.quantity()
  quantity: number;
}
