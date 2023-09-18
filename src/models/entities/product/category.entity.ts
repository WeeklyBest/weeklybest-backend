import { Column, Entity } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { CATEGORY } from '@/models/constants';

@Entity()
export class Category extends CommonIdEntity {
  @Column({
    length: CATEGORY.NAME.MEX_LENGTH,
  })
  name: string;

  @Column({
    length: CATEGORY.CODE.MAX_LENGTH,
    unique: true,
  })
  code: string;
}
