import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';

import { Pagination, getPagination, useTransaction } from '@/common';
import { ERROR } from '@/docs';
import { Product, Review, ReviewSort, User } from '@/models';

import {
  CreateReviewRequest,
  EditReviewRequest,
  ReviewListQuery,
  ReviewResponse,
} from './dtos';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async addReview(
    { content, imageUrl, rating, productId }: CreateReviewRequest,
    user: User,
  ): Promise<void> {
    try {
      await useTransaction(this.dataSource, async (manager) => {
        const productRepository = manager.getRepository(Product);
        const reviewRepository = manager.getRepository(Review);

        const product = await productRepository.findOne({
          where: { id: productId },
        });

        if (!product) {
          throw new HttpException(
            '상품을 찾을 수 없습니다.',
            HttpStatus.NOT_FOUND,
          );
        }

        product.increaseReviewCount();

        await reviewRepository.save(
          reviewRepository.create({
            content,
            imageUrl,
            rating,
            product,
            user,
          }),
        );
      });
    } catch (error) {
      error ||
        new HttpException(
          ERROR.REVIEW.CREATE_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async getReview(id: number): Promise<ReviewResponse> {
    const review = await this.reviewRepository.findOne({
      relations: ['user'],
      where: {
        id,
      },
    });

    this.checkReviewExistence(review);

    return new ReviewResponse(review);
  }

  async editReview(id: number, dto: EditReviewRequest, user: User) {
    try {
      const result = await this.reviewRepository.update(
        { id, user: { id: user.id } },
        dto,
      );

      if (result.affected <= 0) {
        throw new HttpException(ERROR.REVIEW.NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        ERROR.REVIEW.UPDATE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeReview(id: number, user: User) {
    try {
      await useTransaction(this.dataSource, async (manager) => {
        const reviewRepository = manager.getRepository(Review);
        const productRepository = manager.getRepository(Product);

        const review = await reviewRepository.findOne({
          relations: ['product'],
          where: {
            id,
            user: { id: user.id },
          },
        });

        this.checkReviewExistence(review);

        review.product.decreaseReviewCount();

        const result = await reviewRepository.delete(review.id);

        if (result.affected <= 0) {
          throw new HttpException(ERROR.REVIEW.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        await productRepository.save(review.product);
      });
    } catch (error) {
      throw new HttpException(
        ERROR.REVIEW.DELETE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getReviewsByProductId(
    productId: number,
    { pageNum, pageSize, sort }: ReviewListQuery,
  ): Promise<Pagination<ReviewResponse>> {
    let order: Record<string, 'ASC' | 'DESC'> = {
      createdAt: 'DESC',
    };

    switch (sort) {
      case ReviewSort.RATING_DESC:
        order = {
          rating: 'DESC',
          createdAt: 'DESC',
        };
        break;
      case ReviewSort.RATING_ASC:
        order = {
          rating: 'ASC',
          createdAt: 'DESC',
        };
        break;
    }

    const [reviews, count] = await this.reviewRepository.findAndCount({
      relations: ['user'],
      where: {
        product: {
          id: productId,
        },
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      order,
    });

    const reviewList = reviews.map((review) => new ReviewResponse(review));

    return getPagination(reviewList, count, { pageNum, pageSize });
  }

  private checkReviewExistence(review: Review) {
    if (!review) {
      throw new HttpException(ERROR.REVIEW.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
