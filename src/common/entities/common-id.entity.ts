import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from './common.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class CommonIdEntity extends CommonEntity {
  @ApiProperty({
    description: '식별자',
    example: 1,
  })
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;
}
