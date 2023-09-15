import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Column, PrimaryGeneratedColumn } from 'typeorm';

import { SwaggerFiledDocType } from '@/common';
import { PRODUCT, Product } from '@/models';

export const ProductDocs: SwaggerFiledDocType<Product> = {
  id() {
    return applyDecorators(
      ApiProperty({
        description: '아이디',
        example: 1,
        required: true,
      }),
      PrimaryGeneratedColumn({
        unsigned: true,
      }),
    );
  },

  name() {
    return applyDecorators(
      ApiProperty({
        description: '상품명',
        example: '남녀공용 기모 오버핏 무지 맨투맨',
        required: true,
      }),
      Column({
        length: PRODUCT.NAME.MAX_LENGTH,
      }),
    );
  },

  retailPrice() {
    return applyDecorators(
      ApiProperty({
        description: '소비자가',
        example: 10000,
      }),
      Column({
        type: 'mediumint',
        unsigned: true,
        nullable: true,
      }),
    );
  },

  sellingPrice() {
    return applyDecorators(
      ApiProperty({
        description: '판매가',
        example: 8000,
      }),
      Column({
        type: 'mediumint',
        unsigned: true,
        default: 0,
      }),
    );
  },

  // 통계 속성
  salesVolume() {
    return applyDecorators(
      ApiProperty({
        description: '판매량',
        example: 156,
      }),
      Column({
        unsigned: true,
        default: 0,
      }),
    );
  },

  reviewCount() {
    return applyDecorators(
      ApiProperty({
        description: '리뷰 수',
      }),
      Column({
        unsigned: true,
        default: 0,
      }),
    );
  },

  wishCount() {
    return applyDecorators(
      ApiProperty({
        description: '찜 수',
        example: 12,
      }),
      Column({
        unsigned: true,
        default: 0,
      }),
    );
  },

  // check 옵션
  show() {
    return applyDecorators(
      ApiProperty({
        description: '진열 여부',
        example: true,
      }),
      Column({
        type: 'tinyint',
        default: 1,
      }),
    );
  },

  onSale() {
    return applyDecorators(
      ApiProperty({
        description: '판매 여부',
        example: true,
      }),
      Column({
        type: 'tinyint',
        default: 1,
      }),
    );
  },
};
