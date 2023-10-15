import { applyDecorators } from '@nestjs/common';

import { IsBoolean, IsInt, IsString } from 'class-validator';

import {
  SwaggerEntityDocType,
  getIsBooleanMessage,
  getIsIntMessage,
  getIsStringMessage,
} from '@/common';

import { PRODUCT } from '@/models/constants';
import { Product } from '@/models/entities';

export const ProductValidation: SwaggerEntityDocType<Product> = {
  name(propertyName?: string) {
    const property = propertyName || PRODUCT.NAME.KR;
    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
    );
  },

  description(propertyName?: string) {
    const property = propertyName || PRODUCT.DESCRIPTION.KR;
    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
    );
  },

  retailPrice(propertyName?: string) {
    const property = propertyName || PRODUCT.RETAIL_PRICE.KR;
    return applyDecorators(IsInt({ message: getIsIntMessage({ property }) }));
  },

  sellingPrice(propertyName?: string) {
    const property = propertyName || PRODUCT.SELLING_PRICE.KR;
    return applyDecorators(IsInt({ message: getIsIntMessage({ property }) }));
  },

  // 통계 속성
  salesVolume(propertyName?: string) {
    const property = propertyName || PRODUCT.SALES_VOLUME.KR;
    return applyDecorators(IsInt({ message: getIsIntMessage({ property }) }));
  },

  reviewCount(propertyName?: string) {
    const property = propertyName || PRODUCT.REVIEW_COUNT.KR;
    return applyDecorators(IsInt({ message: getIsIntMessage({ property }) }));
  },

  wishCount(propertyName?: string) {
    const property = propertyName || PRODUCT.WISH_COUNT.KR;
    return applyDecorators(IsInt({ message: getIsIntMessage({ property }) }));
  },

  // check 옵션
  display(propertyName?: string) {
    const property = propertyName || PRODUCT.DISPLAY.KR;
    return applyDecorators(
      IsBoolean({ message: getIsBooleanMessage({ property }) }),
    );
  },

  onSale(propertyName?: string) {
    const property = propertyName || PRODUCT.ON_SALE.KR;
    return applyDecorators(
      IsBoolean({ message: getIsBooleanMessage({ property }) }),
    );
  },
};
