import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ORDER_ERROR, Order, OrderStatus, User } from '@/models';

import { CreateOrderRequest, OrderResponse } from './dtos';
import { PagingQuery } from '@/common';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async register(dto: CreateOrderRequest, user: User): Promise<void> {
    const requestOrder = dto.toEntity(user);
    const savedOrder = await this.orderRepository.save(requestOrder);

    if (!savedOrder) {
      throw new HttpException(
        ORDER_ERROR.CREATE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOne(id: number, user: User): Promise<OrderResponse> {
    const order = await this.orderRepository.findOne({ where: { id, user } });

    if (!order) {
      throw new HttpException(ORDER_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return new OrderResponse(order);
  }

  async getMe(
    { pageNum, pageSize }: PagingQuery,
    user: User,
  ): Promise<OrderResponse[]> {
    const orders = await this.orderRepository.find({
      where: {
        user,
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: 'DESC',
      },
    });

    return orders.map((order) => new OrderResponse(order));
  }

  async cancel(id: number, user: User): Promise<void> {
    const result = await this.orderRepository.update(
      { id, user },
      {
        status: OrderStatus.CANCELLED,
      },
    );

    if (result.affected <= 0) {
      throw new HttpException(
        ORDER_ERROR.CANCEL_FAILURE,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
