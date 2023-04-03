import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/database/entities/cart';
import { CartItem } from 'src/database/entities/cart/cartItem';
import { ProductVariantDetail } from 'src/database/entities/product/variant/detail';
import { Repository } from 'typeorm';
import { AddToCartDTO } from './dto/addToCartDTO';
import { Product } from '../database/entities/product/index';
import { ProductVariantOption } from 'src/database/entities/product/variant/options';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(ProductVariantDetail)
    private readonly productVariantDetail: Repository<ProductVariantDetail>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductVariantOption)
    private readonly productVariantOption: Repository<ProductVariantOption>,
  ) {}
  private async _getCart(customer_id: string) {
    const cart = await this.cartRepository.findOne({
      where: {
        customer: {
          _id: customer_id,
        },
      },
    });
    if (!cart) {
      return await this.cartRepository.save({
        customer: {
          _id: customer_id,
        },
      });
    }
    return cart;
  }
  async addToCart(data: AddToCartDTO, customer_id: string) {
    const cart = await this._getCart(customer_id);
    const product = await this.productVariantDetail.findOne({
      where: {
        sku: data.productVariantDetail.sku,
      },
    });
    console.log(
      '🚀 ~ file: cart.service.ts:42 ~ CartService ~ addToCart ~ product:',
      product,
    );
    if (data.quantity > product.stock) {
      throw new BadRequestException('Out of products');
    }
    const isExist = await this.cartItemRepository.findOne({
      where: {
        cart: {
          _id: cart._id,
        },
        product: {
          sku: product.sku,
        },
      },
    });
    if (isExist) {
      await this.cartItemRepository.remove(isExist);
    }
    const cartItem = this.cartItemRepository.create({
      quantity: data.quantity,
      product: {
        sku: product.sku,
      },
      cart: cart,
    });
    await this.cartItemRepository.save(cartItem);
    console.log(
      '🚀 ~ file: cart.service.ts:57 ~ CartService ~ addToCart ~ cartItem:',
      cartItem,
    );
    return 'add success';
  }
  async getCart(customer_id: string) {
    const cart = await this.cartRepository.findOne({
      where: {
        customer: {
          _id: customer_id,
        },
      },
      relations: {
        cartItems: {
          product: true,
        },
      },
    });
    //  update cart when receive new quantity or everthing else from server
    return await Promise.all(
      cart.cartItems.map(async (item) => {
        const {
          product: { sku },
        } = item;
        const [id1, ..._ids] = sku.split('_');
        const product = await this.productRepository.findOne({
          where: {
            _id: +id1,
          },
          relations: {
            shop: true,
            productVariantOptions: true,
          },
        });
        return {
          ...item,
          product: {
            ...item.product,
            ...product,
            price: item.product.price,
            stock: item.product.stock,
          },
        };
      }),
    );
  }
  async update(_id: string, field: Partial<CartItem>) {
    const cartItem = await this.cartItemRepository.findOne({
      where: {
        _id,
      },
      relations: {
        product: true,
      },
    });
    if (field.quantity !== undefined) {
      const stock = cartItem.product.stock;
      if (field.quantity > stock) {
        throw new BadRequestException('Quantity is provided not valid!');
      } else {
        cartItem.quantity = field.quantity;
        await this.cartItemRepository.save(cartItem);
      }
    }
    return 'update success';
  }
}
