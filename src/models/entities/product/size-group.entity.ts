import { Column, Entity, OneToMany } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { SIZE_GROUP } from '@/models';

import { SizeValue } from './size-value.entity';

@Entity()
export class SizeGroup extends CommonIdEntity {
  @Column({
    length: SIZE_GROUP.LABEL.MAX_LENGTH,
  })
  label: string;

  // 연관 관계
  @OneToMany(() => SizeValue, (sizeValue) => sizeValue.sizeGroup, {
    cascade: ['insert'],
  })
  values: SizeValue[];
}
