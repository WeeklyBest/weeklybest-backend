import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';
import { Product } from '@/models';

import { ProductResponseDto } from '../decorators';

import { CategoryResponse } from './category-response.dto';

export class ProductCardResponse {
  @ProductResponseDto.productId()
  id: number;

  @ProductResponseDto.name()
  name: string;

  @ProductResponseDto.thumbnail()
  thumbnail: string;

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
  wished = false;

  @SwaggerDoc.createdAt()
  createdAt: Date;

  @SwaggerDoc.updatedAt()
  updatedAt: Date;

  @ApiProperty({
    description: '상품 카테고리',
    type: CategoryResponse,
  })
  category: CategoryResponse;

  constructor(product: Product, wished?: boolean) {
    this.id = product.id;
    this.name = product.name;
    if (product.images.length > 0) {
      this.thumbnail = product.images[0].url;
    }
    this.retailPrice = product.retailPrice;
    this.sellingPrice = product.sellingPrice;

    this.salesVolume = product.salesVolume;
    this.reviewCount = product.reviewCount;
    this.wishCount = product.wishCount;

    this.display = product.display;
    this.onSale = product.onSale;
    this.wished = wished;

    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;

    if (product.category) {
      this.category = new CategoryResponse(product.category);
    }
  }
}
