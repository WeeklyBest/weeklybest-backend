import { Column, Entity, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { REVIEW } from '@/models/constants';

import { Product } from '../product';

import { User } from './user.entity';

@Entity()
export class Review extends CommonIdEntity {
  @Column({
    length: REVIEW.CONTENT.MAX_LENGTH,
  })
  content: string;

  @Column({
    nullable: true,
  })
  imageUrl: string;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: REVIEW.RATING.MAX,
  })
  rating: number;

  @ManyToOne(() => User, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: User;

  @ManyToOne(() => Product, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
    cascade: ['update'],
  })
  product: Product;
}
