import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';

import { PagingQuery } from '@/common';
import { APP, MESSAGE } from '@/constants';
import {
  CartItem,
  ORDER_ERROR,
  Order,
  OrderDetail,
  OrderStatus,
  User,
  UserRole,
} from '@/models';

import { PaymentsService } from '@/modules/payments';

import { CreateOrderRequest, EditOrderRequest, OrderResponse } from './dtos';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    private readonly paymentsService: PaymentsService,
  ) {}

  /**
   * DTO : ① 배송 기본 정보 ② 주문할 아이템 ID 목록을 받아옵니다.
   *
   * - Logic A : 가격 정보를 처리합니다.
   *
   * * Mapping 주문 : DTO + 가격 정보 + User
   * * Mapping 주문 상세 : Order + CartItem + Variant + Product 가격
   *
   * 를 가공해 DB에 저장합니다.
   *  */
  async register(dto: CreateOrderRequest, user: User): Promise<number> {
    const cartItems = await this.cartItemRepository.find({
      where: {
        id: In(dto.cartItemIds),
        cart: {
          user,
        },
      },
      relations: ['cart', 'variant', 'variant.product'],
    });

    // Logic A : 가격 정보 계산
    const [totalPrice, paymentReal] = this.calculateOrderPrices(cartItems);

    // 결제 위변조 검사
    const { merchantUID, paidAt, paymentMethod, orderStatus } =
      await this.paymentsService.verify(dto.impUID, 100);

    // 주문 Mapping : DTO → 주문 Entity
    const order = dto.toEntity(user, totalPrice, paymentReal);
    order.orderDetails = this.mapCartItemsToOrderDetails(cartItems);
    order.merchantUID = merchantUID;
    order.paidAt = paidAt;
    order.paymentMethod = paymentMethod;
    order.status = orderStatus;

    // DB 저장
    const savedOrder = await this.orderRepository.save(order);

    if (!savedOrder) {
      throw new HttpException(
        ORDER_ERROR.CREATE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return savedOrder.id;
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

  async edit(id: number, dto: EditOrderRequest, user: User) {
    if (user.role === UserRole.USER && dto.status) {
      switch (dto.status) {
        case OrderStatus.AWAITING_PAYMENT:
        case OrderStatus.SHIPPED:
        case OrderStatus.DELIVERED:
        case OrderStatus.EXCHANGED:
        case OrderStatus.REFUNDED:
          throw new HttpException(
            MESSAGE.ERROR.FORBIDDEN,
            HttpStatus.FORBIDDEN,
          );
        default:
          break;
      }
    }

    const result = await this.orderRepository.update({ id, user }, dto);

    if (result.affected <= 0) {
      throw new HttpException(ORDER_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
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

  private calculateOrderPrices(cartItems: CartItem[]): [number, number] {
    let [totalPrice, paymentReal] = [0, 0];
    cartItems.forEach((item) => {
      const { retailPrice, sellingPrice } = item.variant.product;
      const { quantity } = item;

      totalPrice += retailPrice * quantity;
      paymentReal += sellingPrice * quantity;
    });

    // Logic B : 배송비 추가
    if (paymentReal < APP.MINIMUM_AMOUNT_FOR_FREE_SHIPPING) {
      paymentReal += APP.SHIPPING_FEE;
    }
    return [totalPrice, paymentReal];
  }

  private mapCartItemsToOrderDetails(cartItems: CartItem[]) {
    return cartItems.map((item) => {
      const { sellingPrice } = item.variant.product;
      const { quantity, variant } = item;

      return this.orderDetailRepository.create({
        price: sellingPrice,
        quantity: quantity,
        variant: variant,
      });
    });
  }
}
