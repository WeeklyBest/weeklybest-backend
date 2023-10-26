import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { handleException, throwExceptionOrNot, useTransaction } from '@/common';
import { EXCEPTION } from '@/docs';
import { Category, Product, ProductImage } from '@/models';

import { CreateProductForm } from './dtos';

@Injectable()
export class AdminService {
  constructor(private readonly dataSource: DataSource) {}

  async createProduct({
    name,
    description,
    retailPrice,
    sellingPrice,
    categoryId,
    productImageUrl,
  }: CreateProductForm) {
    try {
      await useTransaction(this.dataSource, async (manager) => {
        const categoryRepository = manager.getRepository(Category);
        const productRepository = manager.getRepository(Product);
        const productImageRepository = manager.getRepository(ProductImage);

        const category = await categoryRepository.findOne({
          where: { id: categoryId },
        });

        throwExceptionOrNot(category, EXCEPTION.CATEGORY.NOT_FOUND);

        const newProduct = await productRepository.save(
          productRepository.create({
            name,
            description,
            retailPrice,
            sellingPrice,
            category,
          }),
        );

        console.log('상품 이미지: ', productImageUrl);

        await productImageRepository.save(
          productImageRepository.create({
            url: productImageUrl,
            product: newProduct,
          }),
        );
      });
    } catch (error) {
      handleException(EXCEPTION.PRODUCT.CREATE_ERROR, error);
    }
  }
}
