import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';
import { CartDocs, ProductDocs } from '@/docs';
import { CartItem } from '@/models';

export class CartItemResponse {
  @SwaggerDoc.id('상품 식별자')
  productId: number;

  @ProductDocs.name()
  productName: string;

  @ProductDocs.retailPrice()
  retailPrice: number;

  @ProductDocs.sellingPrice()
  sellingPrice: number;

  @CartDocs.quantity()
  quantity: number;

  @ApiProperty({
    description: '구매 불가 상태',
    example: false,
  })
  disabled: boolean;

  constructor(cartItem: CartItem) {
    const variant = cartItem.variant;
    const product = variant.product;

    this.productId = product.id;
    this.productName = product.name;
    this.retailPrice = product.retailPrice;
    this.sellingPrice = product.sellingPrice;

    this.quantity = cartItem.quantity;
    this.disabled = variant.hide || !product.onSale;
  }
}
