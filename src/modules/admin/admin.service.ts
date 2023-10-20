import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { handleException, throwExceptionOrNot, useTransaction } from '@/common';
import { Category, Product } from '@/models';

import { CreateProductForm } from './dtos';
import { EXCEPTION } from '@/docs';

@Injectable()
export class AdminService {
  constructor(private readonly dataSource: DataSource) {}

  async createProduct({
    name,
    description,
    retailPrice,
    sellingPrice,
    categoryId,
  }: CreateProductForm) {
    try {
      await useTransaction(this.dataSource, async (manager) => {
        const categoryRepository = manager.getRepository(Category);
        const productRepository = manager.getRepository(Product);

        const category = await categoryRepository.findOne({
          where: { id: categoryId },
        });

        throwExceptionOrNot(category, EXCEPTION.CATEGORY.NOT_FOUND);

        await productRepository.save(
          productRepository.create({
            name,
            description,
            retailPrice,
            sellingPrice,
            category
          }),
        );
      });
    } catch (error) {
      handleException(EXCEPTION.PRODUCT.CREATE_ERROR, error);
    }
  }
}
