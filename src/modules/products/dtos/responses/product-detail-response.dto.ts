import { ApiProperty } from '@nestjs/swagger';

import { Color, Product, SizeValue } from '@/models';

import { ColorResponse } from '@/modules/colors';
import { SizeValueResponse } from '@/modules/size';

import { ProductResponseDto } from '../decorators';

import { VariantResponse } from './variant-response.dto';

export class ProductDetailResponse {
  @ProductResponseDto.productId()
  id: number;

  @ProductResponseDto.name()
  name: string;

  @ProductResponseDto.description()
  description: string;

  @ProductResponseDto.retailPrice()
  retailPrice: number;

  @ProductResponseDto.sellingPrice()
  sellingPrice: number;

  @ProductResponseDto.salesVolume()
  salesVolume: number;

  @ProductResponseDto.reviewCount()
  reviewCount: number;

  @ProductResponseDto.wishCount()
  wishCount: number;

  @ProductResponseDto.display()
  display: boolean;

  @ProductResponseDto.onSale()
  onSale: boolean;

  @ProductResponseDto.wished()
  wished: boolean;

  @ProductResponseDto.isSoldOut()
  isSoldOut: boolean;

  @ApiProperty({
    description: '상품 품목 목록',
    type: [VariantResponse],
  })
  variants: VariantResponse[];

  @ApiProperty({
    description: '상품 색상 목록',
    type: [ColorResponse],
  })
  colors: ColorResponse[];

  @ApiProperty({
    description: '상품 사이즈 목록',
    type: [SizeValueResponse],
  })
  sizes: SizeValueResponse[];

  constructor(
    product: Product,
    colors: Color[],
    sizeValues: SizeValue[],
    wished: boolean,
    isSoldOut: boolean,
  ) {
    this.id = product.id;
    this.name = product.name;

    this.retailPrice = product.retailPrice;
    this.sellingPrice = product.sellingPrice;

    this.salesVolume = product.salesVolume;
    this.reviewCount = product.reviewCount;
    this.wishCount = product.wishCount;

    this.display = product.display;
    this.onSale = product.onSale;
    this.wished = wished;
    this.isSoldOut = isSoldOut;

    this.variants = product.variants.map(
      (variant) => new VariantResponse(variant),
    );
    this.colors = colors.map((color) => new ColorResponse(color));
    this.sizes = sizeValues.map(
      (sizeValue) => new SizeValueResponse(sizeValue),
    );
  }
}
