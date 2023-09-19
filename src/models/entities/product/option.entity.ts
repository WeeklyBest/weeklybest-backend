import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { OPTION } from '@/models/constants';
import { InputType } from '@/models/enums';

import { OptionValue } from './option-value.entity';
import { Category } from './category.entity';
import { Product } from './product.entity';

@Entity()
export class Option extends CommonIdEntity {
  @Column({
    length: OPTION.LABEL.MAX_LENGTH,
  })
  label: string;

  @Column({
    length: OPTION.DESCRIPTION.MAX_LENGTH,
    nullable: true,
  })
  description: string;

  @Column({
    default: InputType.CHECKBOX,
  })
  inputType: InputType;

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  order: number;

  // 연관 관계
  @OneToMany(() => OptionValue, (values) => values.option, {
    cascade: ['insert'],
    eager: true,
  })
  values: OptionValue[];

  @ManyToMany(() => Category, (category) => category.options)
  @JoinTable({
    name: 'category_option',
  })
  categories: Category[];

  @ManyToMany(() => Product, (product) => product.options)
  @JoinTable({
    name: 'product_option',
  })
  products: Product[];
}