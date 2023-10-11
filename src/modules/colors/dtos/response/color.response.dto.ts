import { Color } from '@/models';

import { ColorResponseDto } from '../decorator';

export class ColorResponse {
  @ColorResponseDto.colorId()
  id: number;

  @ColorResponseDto.label()
  label: string;

  @ColorResponseDto.hexCode()
  hexCode: string;

  constructor(color: Color) {
    this.id = color.id;
    this.label = color.label;
    this.hexCode = color.hexCode;
  }
}
