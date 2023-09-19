import { PickType } from '@nestjs/swagger';

import { CartDocs } from '@/docs';
import { Cart } from '@/models';

export class CreateCartRequest extends PickType(Cart, ['quantity']) {
  @CartDocs.variantId()
  variantId: number;
}
