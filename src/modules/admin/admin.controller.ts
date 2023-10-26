import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { AdminAuthGuard } from '../auth';

import { CreateProductForm } from './dtos';

import { AdminService } from './admin.service';
import { AdminControllerDoc as Doc } from './controller.doc';

@ApiTags('관리자 API')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Doc.createProduct('상품 생성')
  @Post('product')
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      dest: './images/product',
    }),
  )
  async createProduct(
    @Body() createProductForm: CreateProductForm,
    @UploadedFile() image,
  ): Promise<void> {
    createProductForm.productImageUrl = image.filename;
    await this.adminService.createProduct(createProductForm);
  }
}
