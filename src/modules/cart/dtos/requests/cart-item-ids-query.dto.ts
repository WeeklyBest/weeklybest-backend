import { IsOptional } from 'class-validator';

import { CartItemRequestDto } from '../decorators';

export class CartItemIdsQuery {
  @CartItemRequestDto.cartItemIds()
  @IsOptional()
  ids: number[];
}
