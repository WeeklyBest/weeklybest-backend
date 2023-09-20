import { SwaggerDoc } from '@/common';
import { CategoryDocs } from '@/docs';
import { Category } from '@/models';

export class CategoryResponse {
  @SwaggerDoc.id('카테고리 식별자')
  id: number;

  @CategoryDocs.name()
  name: string;

  @CategoryDocs.code()
  code: string;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.code = category.code;
  }
}
