import { PrimaryGeneratedColumn } from 'typeorm';

import { CommonEntity } from './common.entity';

import { SwaggerDoc } from '../doc';

export abstract class CommonIdEntity extends CommonEntity {
  @SwaggerDoc.id()
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;
}
