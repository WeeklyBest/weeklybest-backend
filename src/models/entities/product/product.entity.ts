import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { ProductDocs as Docs } from '@/docs';
import { PRODUCT } from '@/models/constants';

import { Category } from './category.entity';
import { OptionSet } from './option-set.entity';

@Entity()
export class Product extends CommonIdEntity {
  @Docs.name()
  @Column({
    length: PRODUCT.NAME.MAX_LENGTH,
  })
  name: string;

  @Docs.retailPrice()
  @Column({
    type: 'mediumint',
    unsigned: true,
    nullable: true,
  })
  retailPrice: number;

  @Docs.sellingPrice()
  @Column({
    type: 'mediumint',
    unsigned: true,
  })
  sellingPrice: number;

  // 통계 속성
  @Docs.salesVolume()
  @Column({
    unsigned: true,
    default: 0,
  })
  salesVolume: number;

  @Docs.reviewCount()
  @Column({
    unsigned: true,
    default: 0,
  })
  reviewCount: number;

  @Docs.wishCount()
  @Column({
    unsigned: true,
    default: 0,
  })
  wishCount: number;

  // check 옵션
  @Docs.display()
  @Column({
    default: 1,
  })
  display: boolean;

  @Docs.onSale()
  @Column({
    default: 1,
  })
  onSale: boolean;

  // 연관 관계
  @ManyToOne(() => Category, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  category: Category;

  @ManyToMany(() => OptionSet, (optionSet) => optionSet.products)
  @JoinColumn()
  optionSets: OptionSet[];
}
