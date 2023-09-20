import { SwaggerDoc } from '@/common';
import { ColorDocs } from '@/docs';
import { Color } from '@/models';

export class ColorResponse {
  @SwaggerDoc.id('색상 식별자')
  id: number;

  @ColorDocs.label()
  label: string;

  @ColorDocs.hexCode()
  hexCode: string;

  constructor(color: Color) {
    this.id = color.id;
    this.label = color.label;
    this.hexCode = color.hexCode;
  }
}
