import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsEnum, IsString, ValidateIf } from 'class-validator';

import { SwaggerValidation, getIsStringMessage } from '@/common';
import { ProductDoc } from '@/docs';
import {
  PRODUCT,
  ProductSort,
  ProductValidation,
  PurchasedProductFilter,
} from '@/models';

export const ProductRequestDto = {
  productId() {
    return applyDecorators(ProductDoc.productId(), SwaggerValidation.id());
  },

  name() {
    return applyDecorators(ProductDoc.name(), ProductValidation.name());
  },

  description() {
    return applyDecorators(
      ProductDoc.description(),
      ProductValidation.description(),
    );
  },

  category() {
    return applyDecorators(
      ApiPropertyOptional({
        description: PRODUCT.CATEGORY.KR,
        example: 'outer',
      }),
      IsString({
        message: getIsStringMessage({ property: PRODUCT.CATEGORY.KR }),
      }),
    );
  },

  retailPrice() {
    return applyDecorators(
      ProductDoc.retailPrice(),
      ProductValidation.retailPrice(),
    );
  },

  sellingPrice() {
    return applyDecorators(
      ProductDoc.sellingPrice(),
      ProductValidation.sellingPrice(),
    );
  },

  // 통계 속성
  salesVolume() {
    return applyDecorators(
      ProductDoc.salesVolume(),
      ProductValidation.salesVolume(),
    );
  },

  reviewCount() {
    return applyDecorators(
      ProductDoc.reviewCount(),
      ProductValidation.reviewCount(),
    );
  },

  wishCount() {
    return applyDecorators(
      ProductDoc.wishCount(),
      ProductValidation.wishCount(),
    );
  },

  // check 옵션
  display() {
    return applyDecorators(ProductDoc.display(), ProductValidation.display());
  },

  onSale() {
    return applyDecorators(ProductDoc.onSale(), ProductValidation.onSale());
  },

  sort() {
    return applyDecorators(
      ApiPropertyOptional({
        description: PRODUCT.SORT.KR,
        example: ProductSort.PRICE_ASC,
      }),
      ValidateIf((value) => value === ''),
      IsEnum(ProductSort, {
        message: `지원하지 않는 ${PRODUCT.SORT.KR}입니다.`,
      }),
    );
  },

  reviewableFilter() {
    return applyDecorators(
      ApiPropertyOptional({
        description: PRODUCT.PURCHASED_PRODUCT_SORT.KR,
        example: PurchasedProductFilter.REVIEWABLE,
      }),
      ValidateIf((value) => value === ''),
      IsEnum(PurchasedProductFilter, {
        message: `지원하지 않는 ${PRODUCT.PURCHASED_PRODUCT_SORT.KR}입니다.`,
      }),
    );
  },
};
