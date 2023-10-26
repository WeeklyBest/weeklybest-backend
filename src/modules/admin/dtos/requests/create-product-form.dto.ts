import {
  CategoryRequestDto,
  ProductImageRequestDto,
  ProductRequestDto,
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

  @CategoryRequestDto.categoryId()
  categoryId: number;

  @ProductImageRequestDto.url()
  productImageUrl: string;
}
