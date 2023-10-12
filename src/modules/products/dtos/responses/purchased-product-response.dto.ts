import { Product } from '@/models';

import { ProductResponseDto } from '../decorators';

export class PurchasedProductResponse {
  @ProductResponseDto.productId()
  id: number;

  @ProductResponseDto.name()
  name: string;

  @ProductResponseDto.thumbnail()
  thumbnail: string;

  @ProductResponseDto.display()
  display: boolean;

  @ProductResponseDto.onSale()
  onSale: boolean;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    if (product.images.length > 0) {
      this.thumbnail = product.images[0].url;
    }

    this.display = product.display;
    this.onSale = product.onSale;
  }
}
