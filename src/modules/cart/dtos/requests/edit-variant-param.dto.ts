import { VariantRequestDto } from '@/modules/products';

import { CartItemRequestDto } from '../decorators';

export class EditVariantParam {
  @CartItemRequestDto.cartItemId()
  cartItemId: number;

  @VariantRequestDto.variantId()
  variantId: number;
}
