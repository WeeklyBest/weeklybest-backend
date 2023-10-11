import { SizeValue } from '@/models';

import { SizeValueResponseDto } from '../decorators';

export class SizeValueResponse {
  @SizeValueResponseDto.sizeValueId()
  id: number;

  @SizeValueResponseDto.label()
  label: string;

  @SizeValueResponseDto.order()
  order: number;

  constructor(sizeValue: SizeValue) {
    this.id = sizeValue.id;
    this.label = sizeValue.label;
    this.order = sizeValue.order;
  }
}
