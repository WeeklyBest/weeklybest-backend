import { Column, Entity } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { CATEGORY } from '@/models/constants';
import { CategoryDocs as Docs } from '@/docs';

@Entity()
export class Category extends CommonIdEntity {
  @Docs.name()
  @Column({
    length: CATEGORY.NAME.MEX_LENGTH,
  })
  name: string;

  @Docs.code()
  @Column({
    length: CATEGORY.CODE.MAX_LENGTH,
    unique: true,
  })
  code: string;
}
