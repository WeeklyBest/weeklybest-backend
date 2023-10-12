import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import {
  Pagination,
  getPagination,
  throwExceptionOrNot,
  useTransaction,
} from '@/common';
import { EXCEPTION } from '@/docs';
import {
  CategoryRepository,
  ColorRepository,
  IProductFilterOptions,
  Product,
  ProductRepository,
  SizeValueRepository,
  User,
  Wishlist,
  WishlistRepository,
} from '@/models';

import {
  ProductCardResponse,
  ProductDetailResponse,
  ProductListQuery,
  PurchasedProductResponse,
  ReviewableProductQuery,
} from './dtos';

@Injectable()
export class ProductsService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly colorRepository: ColorRepository,
    private readonly sizeValueRepository: SizeValueRepository,
    private readonly wishlistRepository: WishlistRepository,
  ) {}

  async getAll(
    { pageNum, pageSize, category, sort }: ProductListQuery,
    user: User,
  ): Promise<Pagination<ProductCardResponse>> {
    const productFilterOptions: IProductFilterOptions = {};

    // 유효한 카테고리인지 확인
    if (category === 'sale') {
      productFilterOptions.discount = true;
    } else if (category === 'new') {
      productFilterOptions.thisMonth = true;
    } else if (category) {
      const dbCategory = await this.categoryRepository.findByCode(category);
      throwExceptionOrNot(dbCategory, EXCEPTION.CATEGORY.NOT_FOUND);

      productFilterOptions.category = category;
    }

    // 상품 목록 조회 (+ 페이지네이션)
    const [products, count] = await this.productRepository.getAllAndCount(
      { pageNum, pageSize },
      sort,
      productFilterOptions,
    );

    const responseData = await Promise.all(
      products.map(async (item) => {
        // 품절 여부 검사
        const isSoldOut = await this.productRepository.isProductSoldOut(
          item.id,
        );

        // 위시리스트 추가 여부 검사
        const wished = await this.wishlistRepository.isProductWished(
          item.id,
          user,
        );

        return new ProductCardResponse(item, wished, isSoldOut);
      }),
    );

    return getPagination(responseData, count, { pageNum, pageSize });
  }

  async getOne(productId: number, user: User): Promise<ProductDetailResponse> {
    const product = await this.productRepository.getProductDetail(productId);

    throwExceptionOrNot(product, EXCEPTION.PRODUCT.NOT_FOUND);

    // 위시리스트 추가 여부 검사
    const wished = await this.wishlistRepository.isProductWished(
      productId,
      user,
    );

    const colors = await this.colorRepository.findByProductId(productId);
    const sizeValues = await this.sizeValueRepository.findByProductId(
      productId,
    );

    // 품절 여부 검사
    const isSoldOut = await this.productRepository.isProductSoldOut(productId);

    return new ProductDetailResponse(
      product,
      colors,
      sizeValues,
      wished,
      isSoldOut,
    );
  }

  async addToWishlist(productId: number, user: User) {
    await useTransaction(this.dataSource, async (manager) => {
      const wishlistRepository = manager.getRepository(Wishlist);
      const productRepository = manager.getRepository(Product);

      const product = await this.productRepository.findOne({
        where: { id: productId },
      });

      throwExceptionOrNot(product, EXCEPTION.PRODUCT.NOT_FOUND);

      const result = await wishlistRepository.insert({
        product: { id: productId },
        user: { id: user.id },
      });

      throwExceptionOrNot(result.raw, EXCEPTION.WISHLIST.CREATE_ERROR);

      product.increaseReviewCount();
      await productRepository.save(product);
    });
  }

  async removeFromWishlist(productId: number, user: User) {
    await useTransaction(this.dataSource, async (manager) => {
      const wishlistRepository = manager.getRepository(Wishlist);
      const productRepository = manager.getRepository(Product);

      const product = await productRepository.findOne({
        where: { id: productId },
      });

      throwExceptionOrNot(product, EXCEPTION.PRODUCT.NOT_FOUND);

      const result = await wishlistRepository.delete({
        product: {
          id: productId,
        },
        user: { id: user.id },
      });

      throwExceptionOrNot(result.raw, EXCEPTION.WISHLIST.DELETE_ERROR);

      product.decreaseReviewCount();
      await this.productRepository.save(product);
    });
  }

  async getPurchasedProducts(
    user: User,
    { pageNum, pageSize, filter }: ReviewableProductQuery,
  ) {
    const [products, count] =
      await this.productRepository.getPurchasedProductsAndCount(
        user,
        { pageNum, pageSize },
        filter,
      );

    const list = products.map(
      (product) => new PurchasedProductResponse(product),
    );

    return getPagination(list, count, { pageNum, pageSize });
  }
}
