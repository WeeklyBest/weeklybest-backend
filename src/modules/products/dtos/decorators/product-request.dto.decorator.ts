import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsEnum, IsString, ValidateIf } from 'class-validator';

import { SwaggerValidation, getIsStringMessage } from '@/common';
import { ProductDoc } from '@/docs';
import { ProductSort, PurchasedProductFilter } from '@/models';

import { PRODUCT_DTO } from '../constant';

export const ProductRequestDto = {
  productId() {
    return applyDecorators(ProductDoc.productId(), SwaggerValidation.id());
  },

  category() {
    return applyDecorators(
      ApiPropertyOptional({
        description: PRODUCT_DTO.CATEGORY.KR,
        example: 'outer',
      }),
      IsString({
        message: getIsStringMessage({ property: PRODUCT_DTO.CATEGORY.KR }),
      }),
    );
  },

  sort() {
    return applyDecorators(
      ApiPropertyOptional({
        description: PRODUCT_DTO.SORT.KR,
        example: ProductSort.PRICE_ASC,
      }),
      ValidateIf((value) => value === ''),
      IsEnum(ProductSort, {
        message: `지원하지 않는 ${PRODUCT_DTO.SORT.KR}입니다.`,
      }),
    );
  },

  reviewableFilter() {
    return applyDecorators(
      ApiPropertyOptional({
        description: PRODUCT_DTO.PURCHASED_PRODUCT_SORT.KR,
        example: PurchasedProductFilter.REVIEWABLE,
      }),
      ValidateIf((value) => value === ''),
      IsEnum(PurchasedProductFilter, {
        message: `지원하지 않는 ${PRODUCT_DTO.PURCHASED_PRODUCT_SORT.KR}입니다.`,
      }),
    );
  },
};
