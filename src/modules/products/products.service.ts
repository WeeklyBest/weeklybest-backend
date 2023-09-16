import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IPagination, getPagination } from '@/common';
import { Product, ProductSort } from '@/models';

import { ProductListQuery } from './dtos';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async list({
    pageNum,
    pageSize,
    category,
    sort,
  }: ProductListQuery): Promise<IPagination<Product>> {
    const [productAlias, categoryAlias] = ['product', 'category'];

    // 상품 목록 조회 (+ 페이지네이션)
    const query = this.productRepository
      .createQueryBuilder(productAlias)
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .leftJoinAndSelect(`${productAlias}.Category`, categoryAlias);

    // 상품 그룹별 필터링
    if (category) {
      query.where(`${categoryAlias}.code = :category`, { category });
    }

    // 정렬 방식 지정
    switch (sort) {
      case ProductSort.PRICE_ASC:
        query.orderBy(`${productAlias}.sellingPrice`, 'ASC');
        break;
      case ProductSort.PRICE_DESC:
        query.orderBy(`${productAlias}.sellingPrice`, 'DESC');
        break;
      case ProductSort.BEST_SELLING:
        query.orderBy(`${productAlias}.salesVolume`, 'DESC');
        break;
      case ProductSort.REVIEW_DESC:
        query.orderBy(`${productAlias}.reviewCount`, 'DESC');
        break;
      default:
        query.orderBy(`${productAlias}.createdAt`, 'DESC');
    }

    const [productList, count] = await query.getManyAndCount();

    return getPagination(productList, count, { pageNum, pageSize });
  }

  async getOne(id: number): Promise<Product> {
    const query = this.productRepository
      .createQueryBuilder('product')
      .select(['product'])
      .where('product_id = :id', { id });

    return query.getOne();
  }
}
