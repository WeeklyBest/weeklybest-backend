import { VariantDoc } from '@/docs';
import { CartItem } from '@/models';

import { ColorResponse } from '@/modules/colors';
import { ProductResponseDto } from '@/modules/products';
import { SizeValueResponse } from '@/modules/size';

import { CartItemResponseDto, CartResponseDto } from '../decorators';

export class CartItemResponse {
  @CartItemResponseDto.cartItemId()
  id: number;

  @ProductResponseDto.productId()
  productId: number;

  @VariantDoc.variantId()
  variantId: number;

  @ProductResponseDto.name()
  productName: string;

  @ProductResponseDto.thumbnail()
  thumbnail: string;

  @ProductResponseDto.retailPrice()
  retailPrice: number;

  @ProductResponseDto.sellingPrice()
  sellingPrice: number;

  @CartResponseDto.quantity()
  quantity: number;

  @CartItemResponseDto.stock()
  stock: number;

  @CartItemResponseDto.disabled()
  disabled: boolean;

  @CartItemResponseDto.color()
  color: ColorResponse;

  @CartItemResponseDto.size()
  size: SizeValueResponse;

  constructor(cartItem: CartItem) {
    const variant = cartItem.variant;
    const product = variant.product;
    this.id = cartItem.id;
    this.productId = product.id;
    this.variantId = variant.id;

    this.productName = product.name;
    if (product.images.length > 0) {
      this.thumbnail = product.images[0].url;
    }
    this.retailPrice = product.retailPrice;
    this.sellingPrice = product.sellingPrice;

    this.quantity = cartItem.quantity;
    this.stock = variant.quantity;
    this.disabled = variant.hide || !product.onSale;
    this.color = new ColorResponse(variant.color);
    this.size = new SizeValueResponse(variant.sizeValue);
  }
}
