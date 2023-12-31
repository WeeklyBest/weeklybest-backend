import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { throwExceptionOrNot } from '@/common';
import { EXCEPTION } from '@/docs';
import { Cart, CartItem, CartRepository, User, Variant } from '@/models';

import {
  CartItemResponse,
  AddCartItemRequest,
  EditCartItemRequest,
  AddCartItemResponse,
} from './dtos';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
  ) {}

  async addItem(
    { variantId, quantity }: AddCartItemRequest,
    user: User,
  ): Promise<AddCartItemResponse> {
    let cart = await this.cartRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (!cart) {
      cart = await this.cartRepository.save({
        user,
      });
    }

    // 이미 담겨있는 아이템인지 확인
    let cartItem = await this.cartItemRepository.findOne({
      where: {
        cart: { id: cart.id },
        variant: {
          id: variantId,
        },
      },
    });

    if (cartItem) {
      // 1) 이미 담겨있으면? 수량만 변경
      cartItem.quantity = quantity;
    } else {
      // 2) 새 아이템이면? 장바구니에 새로 등록
      cartItem = this.cartItemRepository.create({
        cart,
        quantity,
        variant: {
          id: variantId,
        },
      });
    }

    // 품목 재고 확인
    const variant = await this.variantRepository.findOne({
      where: { id: variantId },
    });

    let message: string | undefined = undefined;
    if (cartItem.quantity > variant.quantity) {
      message = `상품 재고가 부족하여 ${variant.quantity}개의 아이템만 추가됩니다.`;
    }

    // 장바구니 아이템 저장
    const savedCartItem = await this.cartItemRepository.save(cartItem);
    throwExceptionOrNot(savedCartItem, EXCEPTION.CART.CREATE_ERROR);

    return {
      id: savedCartItem.id,
      message,
    };
  }

  async getCartItems(
    cartItemIds: number[],
    user: User,
  ): Promise<CartItemResponse[]> {
    const cart = await this.cartRepository.findAllByUserIdAndId(
      user.id,
      cartItemIds,
    );

    if (!cart || !cart.items) return [];

    return cart.items.map((cartItem) => new CartItemResponse(cartItem));
  }

  async editVariant(cartItemId: number, variantId: number, user: User) {
    const cart = await this.getUserCart(user);

    // 1. 회원의 장바구니에 변경할 아이템이 있는지 체크 ✅
    const existsCartItem = await this.getCartItem(cartItemId, cart);

    // 2. 장바구니에 변경하려는 품목과 중복되는 아이템이 있는지 체크 ✅
    const duplicatedCartItem = await this.cartItemRepository.findOne({
      relations: ['variant'],
      where: {
        cart: { id: cart.id },
        variant: {
          id: variantId,
        },
      },
    });

    throwExceptionOrNot(!duplicatedCartItem, EXCEPTION.CART.VARIANT_CONFLICT);

    const oldVariant = existsCartItem.variant;
    const newVariant = await this.variantRepository.findOne({
      where: {
        id: variantId,
      },
    });

    // 3. 존재하지 않는 옵션이거나 다른 상품의 옵션이면 예외 발생 ✅
    throwExceptionOrNot(
      newVariant && oldVariant.productId === newVariant.productId,
      EXCEPTION.CART.NOT_SUPPORT_VARIANT,
    );

    // 4. 장바구니 아이템 옵션 업데이트
    await this.cartItemRepository.update(cartItemId, {
      variant: newVariant,
    });
  }

  async editItem(
    cartItemId: number,
    { quantity }: EditCartItemRequest,
    user: User,
  ) {
    const cart = await this.getUserCart(user);

    // 1. 회원의 장바구니에 변경할 아이템이 있는지 체크 ✅
    const existsCartItem = await this.getCartItem(cartItemId, cart);

    // 2. 구매 제한 재고 수량 체크 ✅
    const maxQuantity = existsCartItem.variant.quantity;
    throwExceptionOrNot(quantity <= maxQuantity, EXCEPTION.CART.OUT_OF_STOCK);

    // 3. 장바구니 아이템 데이터 업데이트
    const result = await this.cartItemRepository.update(
      {
        id: cartItemId,
        cart: { id: cart.id },
      },
      {
        quantity,
      },
    );

    // 4. 업데이트된 레코드 유무 체크 ✅
    throwExceptionOrNot(result.affected, EXCEPTION.CART.UPDATE_ERROR);
  }

  async removeItem(id: number, user: User) {
    const cart = await this.getUserCart(user);

    const result = await this.cartItemRepository.delete({
      id,
      cart: { id: cart.id },
    });

    throwExceptionOrNot(result.affected, EXCEPTION.CART.NOT_FOUND);
  }

  async count(user: User) {
    const cart = await this.getUserCart(user);

    return this.cartItemRepository.count({ where: { cart: { id: cart.id } } });
  }

  private async getUserCart(user: User) {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: user.id } },
    });

    throwExceptionOrNot(cart, EXCEPTION.CART.NOT_FOUND);

    return cart;
  }

  private async getCartItem(cartItemId: number, cart: Cart) {
    const existsCartItem = await this.cartItemRepository.findOne({
      where: {
        id: cartItemId,
        cart: { id: cart.id },
      },
      relations: {
        variant: true,
      },
    });

    throwExceptionOrNot(existsCartItem, EXCEPTION.CART.ITEM_NOT_FOUND);

    return existsCartItem;
  }
}
