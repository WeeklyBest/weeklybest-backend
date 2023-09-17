import { Column, Entity, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { Variant } from './variant.entity';

import { User } from '../customer';

@Entity()
export class Cart extends CommonIdEntity {
  @Column({
    type: 'tinyint',
    unsigned: true,
    default: 1,
  })
  quantity: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Variant, {
    onDelete: 'CASCADE',
  })
  variant: Variant;
}
