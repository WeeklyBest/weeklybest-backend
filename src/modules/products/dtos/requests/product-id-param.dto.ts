import { ProductRequestDto } from '../decorators';

export class ProductIdParam {
  @ProductRequestDto.productId()
  productId: number;
}
