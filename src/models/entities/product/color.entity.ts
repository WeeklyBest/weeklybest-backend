import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { COLOR } from '@/models';

import { Variant } from './variant.entity';

@Entity()
export class Color {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    length: COLOR.LABEL.MAX,
  })
  label: string;

  @Column({
    type: 'char',
    length: COLOR.HEX_CODE.MAX,
  })
  hexCode: string;

  // 연관 관계
  @OneToMany(() => Variant, (variant) => variant.color)
  variants: Variant[];
}
