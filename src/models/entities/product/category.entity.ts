import { Column, Entity } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { CategoryDocs as Docs } from '@/docs';
import { CATEGORY } from '@/models/constants';

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
