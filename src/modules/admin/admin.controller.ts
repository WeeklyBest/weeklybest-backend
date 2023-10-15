import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
  async createProduct(
    @Body() createProductForm: CreateProductForm,
  ): Promise<void> {
    await this.adminService.createProduct(createProductForm);
  }
}
