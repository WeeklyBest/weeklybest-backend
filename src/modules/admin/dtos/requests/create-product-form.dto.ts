import { ColorRequestDto } from '@/modules/colors';
import {
  CategoryRequestDto,
  ProductRequestDto,
  VariantRequestDto,
} from '@/modules/products';

export class CreateProductForm {
  @ProductRequestDto.name()
  name: string;

  @ProductRequestDto.description()
  description: string;

  @ProductRequestDto.retailPrice()
  retailPrice: number;

  @ProductRequestDto.sellingPrice()
  sellingPrice: number;

  @ColorRequestDto.colorId()
  colorId: number;

  @VariantRequestDto.quantity()
  quantity: number;

  @CategoryRequestDto.categoryId()
  categoryId: number;
}
