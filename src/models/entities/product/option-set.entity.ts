import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';

import { CommonIdEntity } from '@/common';
import { OptionSetDocs as Docs } from '@/docs';

import { OPTION_SET } from '@/models/constants';
import { InputType } from '@/models/enums';

import { Category } from './category.entity';
import { OptionValue } from './option-value.entity';
import { Product } from './product.entity';

@Unique('unq_option_set_category_name', ['category', 'name'])
@Unique('unq_option_set_category_order', ['category', 'order'])
@Entity()
export class OptionSet extends CommonIdEntity {
  @Docs.name()
  @Column({
    length: OPTION_SET.NAME.MAX_LENGTH,
  })
  name: string;

  @Docs.inputType()
  @Column({
    default: InputType.CHECKBOX,
  })
  inputType: InputType;

  @Docs.order()
  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  order: number;

  @OneToMany(() => OptionValue, (values) => values.optionSet, {
    cascade: ['insert'],
  })
  values: OptionValue[];

  @ManyToOne(() => Category)
  category: Category;

  @ManyToMany(() => Product, (product) => product.optionSets)
  @JoinTable({
    name: 'product_option',
  })
  products: Product[];
}
