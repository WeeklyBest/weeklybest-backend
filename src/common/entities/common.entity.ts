import { ApiPropertyOptional } from '@nestjs/swagger';

import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CommonEntity {
  @ApiPropertyOptional({
    example: '2023-09-10 18:00:32',
    description: '생성일',
    required: true,
  })
  @CreateDateColumn()
  createdAt?: Date;

  @ApiPropertyOptional({
    example: '2023-09-11 12:36:22',
    description: '수정일',
  })
  @UpdateDateColumn()
  updatedAt?: Date;
}
