import { CartDocs } from '@/docs';

export class CreateCartRequest {
  @CartDocs.variantId()
  variantId: number;

  @CartDocs.quantity()
  quantity: number;
}
