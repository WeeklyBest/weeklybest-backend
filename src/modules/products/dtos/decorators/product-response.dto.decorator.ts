import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { ProductDoc } from '@/docs';

export const ProductResponseDto = {
  productId() {
    return applyDecorators(ProductDoc.productId());
  },

  name() {
    return applyDecorators(ProductDoc.name());
  },

  description() {
    return applyDecorators(ProductDoc.description());
  },

  thumbnail() {
    return applyDecorators(ProductDoc.thumbnail());
  },

  retailPrice() {
    return applyDecorators(ProductDoc.retailPrice());
  },

  sellingPrice() {
    return applyDecorators(ProductDoc.sellingPrice());
  },

  salesVolume() {
    return applyDecorators(ProductDoc.salesVolume());
  },

  reviewCount() {
    return applyDecorators(ProductDoc.reviewCount());
  },

  wishCount() {
    return applyDecorators(ProductDoc.wishCount());
  },

  display() {
    return applyDecorators(ProductDoc.display());
  },

  onSale() {
    return applyDecorators(ProductDoc.onSale());
  },

  wished() {
    return applyDecorators(ProductDoc.wished());
  },

  images() {
    return applyDecorators(
      ApiProperty({
        description: '상품 이미지 목록',
      }),
    );
  },
};
