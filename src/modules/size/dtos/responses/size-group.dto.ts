import { ApiProperty } from '@nestjs/swagger';

import { SizeGroup } from '@/models';

import { SizeGroupResponseDto } from '../decorators';

import { SizeValueResponse } from './size-value.dto';

export class SizeGroupResponse {
  @SizeGroupResponseDto.sizeGroupId()
  id: number;

  @SizeGroupResponseDto.label()
  label: string;

  @ApiProperty({
    description: '사이즈 값 목록',
    type: [SizeValueResponse],
  })
  values: SizeValueResponse[];

  constructor(sizeGroup: SizeGroup) {
    this.id = sizeGroup.id;
    this.label = sizeGroup.label;

    this.values = sizeGroup.values.map((value) => new SizeValueResponse(value));
  }
}
