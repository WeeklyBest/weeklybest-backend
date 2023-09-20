import { SwaggerDoc } from '@/common';
import { ProductDocs } from '@/docs';
import { CategoryResponse } from './category.dto';
import { Product } from '@/models';

export class ProductCardResponse {
  @SwaggerDoc.id('상품 식별자')
  id: number;

  @ProductDocs.name()
  name: string;

  @ProductDocs.retailPrice()
  retailPrice: number;

  @ProductDocs.sellingPrice()
  sellingPrice: number;

  @ProductDocs.salesVolume()
  salesVolume: number;

  @ProductDocs.reviewCount()
  reviewCount: number;

  @ProductDocs.wishCount()
  wishCount: number;

  @ProductDocs.display()
  display: boolean;

  @ProductDocs.onSale()
  onSale: boolean;

  @SwaggerDoc.createdAt()
  createdAt: Date;

  @SwaggerDoc.updatedAt()
  updatedAt: Date;

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
