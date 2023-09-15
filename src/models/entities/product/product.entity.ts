import { Entity } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { ProductDocs as Docs } from '@/docs';

@Entity()
export class Product extends CommonIdEntity {
  @Docs.id()
  id: number;

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
  @Docs.show()
  show: boolean;

  @Docs.onSale()
  onSale: boolean;
}
