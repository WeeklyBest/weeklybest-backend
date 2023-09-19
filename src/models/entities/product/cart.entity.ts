import { Column, Entity, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { CartDocs as Docs } from '@/docs';

import { Variant } from './variant.entity';

import { User } from '../customer';

@Entity()
export class Cart extends CommonIdEntity {
  @Docs.quantity()
  @Column({
    type: 'tinyint',
    unsigned: true,
    default: 1,
  })
  quantity: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: User;

  @ManyToOne(() => Variant, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  variant: Variant;
}
