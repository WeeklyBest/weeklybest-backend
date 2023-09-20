import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';
import { ProductDoc } from '@/docs';
import { Product } from '@/models';

import { CategoryResponse } from './category-response.dto';

export class ProductCardResponse {
  @SwaggerDoc.id('상품 식별자')
  id: number;

  @ProductDoc.name()
  name: string;

  @ProductDoc.retailPrice()
  retailPrice: number;

  @ProductDoc.sellingPrice()
  sellingPrice: number;

  @ProductDoc.salesVolume()
  salesVolume: number;

  @ProductDoc.reviewCount()
  reviewCount: number;

  @ProductDoc.wishCount()
  wishCount: number;

  @ProductDoc.display()
  display: boolean;

  @ProductDoc.onSale()
  onSale: boolean;

  @SwaggerDoc.createdAt()
  createdAt: Date;

  @SwaggerDoc.updatedAt()
  updatedAt: Date;

  @ApiProperty({
    description: '상품 카테고리',
    type: CategoryResponse,
  })
  category: CategoryResponse;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.retailPrice = product.retailPrice;
    this.sellingPrice = product.sellingPrice;

    this.salesVolume = product.salesVolume;
    this.reviewCount = product.reviewCount;
    this.wishCount = product.wishCount;

    this.display = product.display;
    this.onSale = product.onSale;

    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;

    this.category = new CategoryResponse(product.category);
  }
}
