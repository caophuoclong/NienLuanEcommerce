import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/database/entities/cart';
import { CartItem } from 'src/database/entities/cart/cartItem';
import { ProductVariantDetail } from 'src/database/entities/product/variant/detail';
import { In, Repository } from 'typeorm';
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
    const { cart: cart1, ...result } = await this.cartItemRepository.save(
      cartItem,
    );
    const sku = result.product.sku;
    const [productId, ...x] = sku.split('_');
    const detail = await this.productVariantDetail.findOne({
      where: {
        sku,
      },
    });

    const newProduct = await this.productRepository.findOne({
      where: {
        _id: +productId,
      },
      relations: {
        shop: true,
        productVariantOptions: true,
      },
    });

    return {
      ...result,
      product: {
        ...newProduct,
        price: detail.price,
        stock: detail.stock,
        sku: detail.sku,
      },
    };
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
    return {
      _id,
      field,
    };
  }
  async handleDeleteProductItem(sku: string, userId: string) {
    console.log(
      '🚀 ~ file: cart.service.ts:172 ~ CartService ~ handleDeleteProductItem ~ sku:',
      sku,
    );
    const cart = await this.cartRepository.findOneBy({
      customer: {
        _id: userId,
      },
    });
    if (!cart) {
      throw new BadRequestException('Could not find cart with this user');
    }
    await this.cartItemRepository.delete({
      cart: {
        _id: cart._id,
      },
      product: {
        sku,
      },
    });
    // const item = await this.cartItemRepository.findOneBy({
    //   cart: {
    //     _id: cart._id,
    //   },
    //   product: {
    //     sku,
    //   },
    // });
    // console.log(
    //   '🚀 ~ file: cart.service.ts:189 ~ CartService ~ handleDeleteProductItem ~ item:',
    //   item,
    // );
    // // await this.cartItemRepository.remove(item);
    return 'Delete product item success';
  }
  async handleDeleteManyCartItem(cartItemId: number[]) {
    const cartItems = await this.cartItemRepository.find({
      where: {
        _id: In(cartItemId),
      },
    });
    console.log(
      '🚀 ~ file: cart.service.ts:198 ~ CartService ~ handleDeleteManyCartItem ~ cartItems:',
      cartItems,
    );
    await this.cartItemRepository.remove(cartItems);
    return 'Remove cartitem success';
  }
}
