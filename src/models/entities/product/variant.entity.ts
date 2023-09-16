import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { VariantDocs as Docs } from '@/docs';

import { OptionValue } from './option-value.entity';
import { Product } from './product.entity';

@Entity()
export class Variant extends CommonIdEntity {
  @Docs.quantity()
  @Column({
    type: 'smallint',
    unsigned: true,
    default: 0,
  })
  quantity: number;

  @Docs.hide()
  @Column({
    default: false,
  })
  hide: boolean;

  // 연관 관계
  @ManyToOne(() => Product, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  product: Product;

  @ManyToMany(() => OptionValue, (optionValue) => optionValue.variants)
  @JoinTable({
    name: 'variant_option_value',
    inverseJoinColumn: { name: 'value_id', referencedColumnName: 'id' },
  })
  optionValues: OptionValue[];
}