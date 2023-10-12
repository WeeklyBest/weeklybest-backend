import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { Repository } from 'typeorm';

import { Pagination, PagingQuery, getPagination } from '@/common';
import { ERROR } from '@/docs';
import { Question, Review, User, UserRepository, Wishlist } from '@/models';

import { EditUserRequest, ChangePasswordForm } from './dtos';

import { AUTH } from '../auth';
import { ProductCardResponse } from '../products';
import { MyQuestionResponse } from '../questions';
import { MyReviewResponse } from '../reviews';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(ERROR.USER.NOT_FOUND);
    }

    return user;
  }

  async editUserInfo({ name, phone }: EditUserRequest, user: User) {
    const result = await this.userRepository.update(user.id, {
      name,
      phone,
    });

    if (!result) {
      throw new HttpException(
        '회원 정보 수정 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMyWishlist(user: User, pagingQuery: PagingQuery) {
    const { pageNum, pageSize } = pagingQuery;

    const [wishlist, count] = await this.wishlistRepository.findAndCount({
      relations: ['product', 'product.images'],
      where: {
        user: { id: user.id },
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: 'DESC',
      },
    });

    const products = wishlist.map(
      (item) => new ProductCardResponse(item.product, true),
    );

    return getPagination(products, count, pagingQuery);
  }

  async changePassword(changePasswordForm: ChangePasswordForm, user: User) {
    const { currentPassword, newPassword, confirmNewPassword } =
      changePasswordForm;

    if (newPassword !== confirmNewPassword) {
      throw new HttpException(
        '새 비밀번호와 비밀번호 확인란이 일치하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userWithPassword = await this.userRepository.findOne({
      where: { id: user.id },
      select: ['password'],
    });

    if (!userWithPassword) {
      throw new HttpException(
        '사용자를 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      userWithPassword.password,
    );

    if (!isMatch) {
      throw new HttpException(
        '현재 비밀번호가 일치하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, AUTH.SALT);

    await this.userRepository.update(user.id, { password: hashedNewPassword });
  }

  async getMyQuestions(
    user: User,
    pagingQuery: PagingQuery,
  ): Promise<Pagination<MyQuestionResponse>> {
    const { pageNum, pageSize } = pagingQuery;

    const [myQuestions, count] = await this.questionRepository.findAndCount({
      relations: ['product', 'product.images', 'user'],
      where: {
        user: { id: user.id },
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: 'DESC',
      },
    });

    const dtos = myQuestions.map((item) => new MyQuestionResponse(item, user));

    return getPagination(dtos, count, pagingQuery);
  }

  async getMyReviews(
    user: User,
    pagingQuery: PagingQuery,
  ): Promise<Pagination<MyReviewResponse>> {
    const { pageNum, pageSize } = pagingQuery;

    const [myReviews, count] = await this.reviewRepository.findAndCount({
      relations: ['user', 'product', 'product.images'],
      where: {
        user: { id: user.id },
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: 'DESC',
      },
    });

    const dtos = myReviews.map((item) => new MyReviewResponse(item));

    return getPagination(dtos, count, pagingQuery);
  }
}
