import { PickType } from '@nestjs/swagger';

import { Product } from '@/models';

export class CreateProductForm extends PickType(Product, [
  'name',
  'retailPrice',
  'sellingPrice',
  'onSale',
  'show',
]) {}
