import { Category } from '@/models';

import { CategoryResponseDto } from '../decorators';

export class CategoryResponse {
  @CategoryResponseDto.categoryId()
  id: number;

  @CategoryResponseDto.name()
  name: string;

  @CategoryResponseDto.code()
  code: string;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.code = category.code;
  }
}
