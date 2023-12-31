import { Column, DeleteDateColumn, Entity, OneToMany } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { SNSProvider, USER, UserRole, Wishlist } from '@/models';

@Entity()
export class User extends CommonIdEntity {
  @Column({
    unique: true,
    length: USER.EMAIL.MAX_LENGTH,
  })
  email: string;

  @Column({
    length: USER.PASSWORD.MAX_LENGTH,
    nullable: true,
    select: false,
  })
  password: string;

  @Column({
    length: USER.NAME.MAX_LENGTH,
  })
  name: string;

  @Column({
    type: 'char',
    length: USER.PHONE.MAX_LENGTH,
    nullable: true,
  })
  phone: string;

  @Column({
    default: 0,
  })
  point: number;

  @Column({
    type: 'char',
    length: USER.ROLE.MAX_LENGTH,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    length: USER.PROVIDER.MAX_LENGTH,
    default: SNSProvider.LOCAL,
  })
  provider: SNSProvider;

  @Column({
    nullable: true,
  })
  snsId: string;

  @Column({
    nullable: true,
    select: false,
  })
  refreshToken: string;

  @DeleteDateColumn()
  deletedAt: Date;

  // 관계 설정
  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlist: Wishlist[];
}
