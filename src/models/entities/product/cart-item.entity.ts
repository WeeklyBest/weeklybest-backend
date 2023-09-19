import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { CommonEntity } from '@/common';

import { Cart } from './cart.entity';
import { Variant } from './variant.entity';

@Entity()
export class CartItem extends CommonEntity {
  @PrimaryColumn()
  cartId: number;

  @PrimaryColumn()
  variantId: number;

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
