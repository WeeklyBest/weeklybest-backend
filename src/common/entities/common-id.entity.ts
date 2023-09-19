import { PrimaryGeneratedColumn } from 'typeorm';

import { CommonEntity } from './common.entity';

import { SwaggerDoc } from '../doc';

export abstract class CommonIdEntity extends CommonEntity {
  @SwaggerDoc.id('식별자')
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;
}
