import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AdminService } from './admin.service';
import { AdminControllerDocs as Docs } from './admin.controller.docs';
import { UploadProductForm } from './dtos';
import { AdminStrategy } from '../strategies/admin.strategy';

@ApiTags('관리자 API')
@Controller('admin')
export class AdminController {
  constructor(private readonly productsService: AdminService) {}

  @Docs.uploadProduct('상품 업로드')
  @Post('products/upload')
  @UseGuards(AdminStrategy)
  async uploadProduct(@Body() uploadProductForm: UploadProductForm) {
    return this.productsService.uploadProduct(uploadProductForm);
  }
}