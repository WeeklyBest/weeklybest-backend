import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { SIZE_GROUP } from '@/models';

import { SizeGroup } from './size-group.entity';
import { Variant } from './variant.entity';

@Entity()
export class SizeValue extends CommonIdEntity {
  @Column({
    length: SIZE_GROUP.LABEL.MAX_LENGTH,
  })
  label: string;

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  order: number;

  // 연관 관계
  @ManyToOne(() => SizeGroup, (sizeGroup) => sizeGroup.values, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  sizeGroup: SizeGroup;

  @OneToMany(() => Variant, (variant) => variant.sizeValue)
  variants: Variant[];
}
