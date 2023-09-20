import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';
import { CartDocs, ProductDocs } from '@/docs';
import { CartItem } from '@/models';
import { ColorResponse } from '@/modules/colors';

export class CartItemResponse {
  @SwaggerDoc.id('상품 식별자')
  productId: number;

  @SwaggerDoc.id('상품 품목 식별자')
  variantId: number;

  @ProductDocs.name()
  productName: string;

  @ProductDocs.retailPrice()
  retailPrice: number;

  @ProductDocs.sellingPrice()
  sellingPrice: number;

  @CartDocs.quantity()
  quantity: number;

  @ApiProperty({
    description: '재고 수량',
    example: 10,
  })
  stock: number;

  @ApiProperty({
    description: '구매 불가 상태',
    example: false,
  })
  disabled: boolean;

  @ApiProperty({
    description: '색상 옵션',
    type: ColorResponse,
  })
  color: ColorResponse;

  constructor(cartItem: CartItem) {
    const variant = cartItem.variant;
    const product = variant.product;

    this.productId = product.id;
    this.variantId = variant.id;

    this.productName = product.name;
    this.retailPrice = product.retailPrice;
    this.sellingPrice = product.sellingPrice;

    this.quantity = cartItem.quantity;
    this.stock = variant.quantity;
    this.disabled = variant.hide || !product.onSale;

    this.color = new ColorResponse(variant.color);
  }
}
