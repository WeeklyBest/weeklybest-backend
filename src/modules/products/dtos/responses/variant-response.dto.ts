import { Variant } from '@/models';

import { ColorResponseDto } from '@/modules/colors';
import { SizeValueResponseDto } from '@/modules/size';

import { VariantResponseDto } from '../decorators';

export class VariantResponse {
  @VariantResponseDto.variantId()
  id: number;

  @VariantResponseDto.quantity()
  quantity: number;

  @ColorResponseDto.colorId()
  colorId: number;

  @SizeValueResponseDto.sizeValueId()
  sizeId: number;

  constructor(variant: Variant) {
    this.id = variant.id;
    this.quantity = variant.quantity;
    this.colorId = variant.colorId;
    this.sizeId = variant.sizeValueId;
  }
}
