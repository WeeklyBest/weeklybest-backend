import { CartDoc } from '@/docs';
import { Cart } from '@/models';
import { PickType } from '@nestjs/swagger';

export class CreateCartDto extends PickType(Cart, ['quantity']) {
  @CartDoc.variantId()
  variantId: number;
}
