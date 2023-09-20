import { CartDocs } from '@/docs';

export class EditCartItemRequest {
  @CartDocs.quantity()
  quantity: number;
}
