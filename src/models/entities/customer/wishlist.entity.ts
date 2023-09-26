import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Product } from '../product';

import { User } from './user.entity';

@Unique('uq_product_user', ['product', 'user'])
@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  // 관계 설정
  @ManyToOne(() => Product, (product) => product.wishlist, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => User, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  user: User;
}
