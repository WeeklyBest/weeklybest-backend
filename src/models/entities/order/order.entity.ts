import { Column, Entity, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { USER, ORDER } from '@/models/constants';
import { OrderStatus, PaymentMethod } from '@/models/enums';

import { User } from '../customer';

@Entity()
export class Order extends CommonIdEntity {
  @Column({
    unsigned: true,
  })
  totalPrice: number;

  @Column({
    unsigned: true,
    default: 0,
  })
  discount: number;

  @Column({
    length: USER.NAME.MAX_LENGTH,
  })
  recipient: string;

  @Column({
    type: 'char',
    length: USER.PHONE.MAX_LENGTH,
  })
  recipientPhone: string;

  @Column({
    type: 'char',
    length: ORDER.POSTAL_CODE.LENGTH,
  })
  postalCode: string;

  @Column()
  shippingAddress: string;

  @Column({
    length: ORDER.MESSAGE.MAX_LENGTH,
  })
  message: string;

  @Column({
    default: OrderStatus.AWAITING_PAYMENT,
  })
  status: OrderStatus;

  @Column()
  paymentMethod: PaymentMethod;

  @Column({
    nullable: true,
  })
  arrivedAt: Date;

  @Column({
    nullable: true,
  })
  paidAt: Date;

  // 연관 관계
  @ManyToOne(() => User, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  user: User;
}
