import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AdminStrategy } from '@/modules/auth/strategies/admin.strategy';

import { ProductsService } from './products.service';
import { UploadProductForm } from './dtos';
import { ProductsControllerDocs as Docs } from './products.controller.docs';

@ApiTags('관리자 페이지')
@Controller('admin')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Docs.createProduct('상품 업로드')
  @Post('products/create')
  @UseGuards(AdminStrategy)
  async createProduct(@Body() uploadProductForm: UploadProductForm) {
    return this.productsService.uploadProduct(uploadProductForm);
  }
}
