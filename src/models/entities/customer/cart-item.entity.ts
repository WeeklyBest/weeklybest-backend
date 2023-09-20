import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { Variant } from '../product';

import { Cart } from './cart.entity';

@Entity()
export class CartItem extends CommonIdEntity {
  @ManyToOne(() => Cart, (cart) => cart.items, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @ManyToOne(() => Variant, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'variantId' })
  variant: Variant;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: 1,
  })
  quantity: number;
}
