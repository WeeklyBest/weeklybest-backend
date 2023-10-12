import { VariantRequestDto } from '@/modules/products';

import { CartRequestDto } from '../decorators';

export class AddCartItemRequest {
  @VariantRequestDto.variantId()
  variantId: number;

  @CartRequestDto.quantity()
  quantity: number;
}
