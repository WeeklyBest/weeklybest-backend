import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PagingQuery } from '@/common';
import { REVIEW_ERROR, Review, User } from '@/models';

import { CreateReviewRequest, EditReviewRequest, ReviewResponse } from './dtos';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async addReview(
    { content, imageUrl, rating, productId }: CreateReviewRequest,
    user: User,
  ): Promise<void> {
    try {
      await this.reviewRepository.save(
        this.reviewRepository.create({
          content,
          imageUrl,
          rating,
          product: { id: productId },
          user,
        }),
      );
    } catch (err) {
      throw new HttpException(
        REVIEW_ERROR.CREATE_ERROR,
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

    if (!review) {
      throw new HttpException(REVIEW_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return new ReviewResponse(review);
  }

  async editReview(id: number, dto: EditReviewRequest, user: User) {
    try {
      const result = await this.reviewRepository.update({ id, user }, dto);

      if (result.affected <= 0) {
        throw new HttpException(REVIEW_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    } catch (err) {
      throw new HttpException(
        REVIEW_ERROR.UPDATE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeReview(id: number, user: User) {
    try {
      const result = await this.reviewRepository.delete({
        id,
        user,
      });

      if (result.affected <= 0) {
        throw new HttpException(REVIEW_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    } catch (err) {
      throw new HttpException(
        REVIEW_ERROR.DELETE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getReviewsByProductId(
    productId: number,
    { pageNum, pageSize }: PagingQuery,
  ): Promise<ReviewResponse[]> {
    const reviews = await this.reviewRepository.find({
      relations: ['user'],
      where: {
        product: {
          id: productId,
        },
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: 'DESC',
      },
    });

    return reviews.map((review) => new ReviewResponse(review));
  }
}
