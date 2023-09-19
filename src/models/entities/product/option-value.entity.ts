import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { CommonIdEntity } from '@/common';
import { OPTION_VALUE } from '@/models/constants';

import { Variant } from './variant.entity';
import { Option } from './option.entity';

@Entity()
export class OptionValue extends CommonIdEntity {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  optionId: number;

  @Column({
    length: OPTION_VALUE.VALUE.MAX_LENGTH,
  })
  value: string;

  @Column({
    type: 'mediumint',
    default: 0,
  })
  additionalCharge: number;

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  order: number;

  // 연관 관계
  @ManyToOne(() => Option, ({ values }) => values, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'optionId' })
  option: Option;

  @ManyToMany(() => Variant, ({ optionValues }: Variant) => optionValues)
  variants: Variant[];
}
