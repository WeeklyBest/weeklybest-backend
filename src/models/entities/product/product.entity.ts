import { Entity, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { ProductDocs as Docs } from '@/docs';

import { Category } from './category.entity';

@Entity()
export class Product extends CommonIdEntity {
  @Docs.name()
  name: string;

  @Docs.retailPrice()
  retailPrice: number;

  @Docs.sellingPrice()
  sellingPrice: number;

  // 통계 속성
  @Docs.salesVolume()
  salesVolume: number;

  @Docs.reviewCount()
  reviewCount: number;

  @Docs.wishCount()
  wishCount: number;

  // check 옵션
  @Docs.display()
  display: boolean;

  @Docs.onSale()
  onSale: boolean;

  @ManyToOne(() => Category, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  Category: Category;
}
