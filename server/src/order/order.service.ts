import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Address from 'src/database/entities/address';
import { CartItem } from 'src/database/entities/cart/cartItem';
import { CreditCard } from 'src/database/entities/creditCard';
import { Customer } from 'src/database/entities/customer';
import { Order, OrderStatus } from 'src/database/entities/order';
import { OrderItem } from 'src/database/entities/order/orderItem';
import {
  Payment,
  PaymentStatus,
  PaymentType,
} from 'src/database/entities/payment';
import { Product } from 'src/database/entities/product';
import { ProductVariantDetail } from 'src/database/entities/product/variant/detail';
import { ProductVariantOption } from 'src/database/entities/product/variant/options';
import { PaymentService } from 'src/payment/payment.service';
import { In, Repository } from 'typeorm';
import { CheckoutDTO, IAdress, ICard } from './dto/checkoutDTO';
import { NotFoundError } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(CreditCard)
    private readonly crediCardRepository: Repository<CreditCard>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(ProductVariantDetail)
    private readonly productVariantDetail: Repository<ProductVariantDetail>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductVariantOption)
    private readonly productVariantOptionRepository: Repository<ProductVariantOption>,
    private readonly paymentService: PaymentService,
  ) {}

  private async _getAddress(customer: Customer, address: IAdress) {
    if (address._id && !isNaN(address._id)) {
      return await this.addressRepository.findOneBy({
        _id: address._id,
      });
    } else {
      const { _id, ...x } = address;
      const address1 = this.addressRepository.create();
      (address1.ward = x.ward), (address1.customer = customer);
      address1.detail = x.detail;
      address1.phone = x.phone;
      address1.name = x.name;
      return await this.addressRepository.save(address1);
    }
  }
  private async _checkStock(products: CartItem[]) {
    const skus = products.map((product) => product.product.sku);
    const outofStock = [];
    const variantDetails = await this.productVariantDetail.find({
      where: {
        sku: In(skus),
      },
    });
    for (const product of products) {
      const variantDetail = variantDetails.find(
        (variantDetail) => variantDetail.sku === product.product.sku,
      );
      if (variantDetail.stock < product.quantity) {
        outofStock.push(product.product.sku);
      }
    }
    return {
      outofStock,
      validProducts: products.filter(
        (product) => !outofStock.includes(product.product.sku),
      ),
    };
  }
  async checkout(_id: string, checkoutDTO: CheckoutDTO) {
    const { products } = checkoutDTO;
    const customer = await this.customerRepository.findOne({
      where: {
        _id,
      },
    });
    const order = this.orderRepository.create();
    const shop: any = {};
    const { validProducts, outofStock } = await this._checkStock(products);
    validProducts.forEach((product: any) => {
      if (!shop[product.product.shop._id]) {
        shop[product.product.shop._id] = [];
      }
      shop[product.product.shop._id].push(product);
    });
    const address = await this._getAddress(customer, checkoutDTO.address);
    order.customer = customer;
    order.shippingCost = 25000;
    order.tax = 0;
    order.address = address;
    for (const key in shop) {
      const payment = await this.paymentService.createPayment(
        customer,
        checkoutDTO.card,
        {
          ...checkoutDTO.payment,
          amount: 0,
        },
      );
      order.status = OrderStatus.PENDING;
      order.payment = payment;
      const existShop = await this.customerRepository.findOne({
        where: {
          _id: key,
        },
      });
      order.shop = existShop;
      const newOrder = await this.orderRepository.save({
        ...order,
      });
      // const products =
      const products = shop[key];
      const skus = products.map((product: any) => product.product.sku);
      const variantDetails = await this.productVariantDetail.find({
        where: {
          sku: In(skus),
        },
      });
      const orderItems = await Promise.all(
        products.map(async (product) => {
          const variantDetail = variantDetails.find(
            (variantDetail) => variantDetail.sku === product.product.sku,
          );
          const orderItem = await this.orderItemRepository.save({
            order: newOrder,
            price: product.product.price,
            quantity: product.quantity,
            productVariantDetail: variantDetail,
          });
          return orderItem;
        }),
      );
      const price = orderItems.reduce((a, b) => a + b.price * b.quantity, 0);
      payment.amount = price + order.shippingCost;
      try {
        await this.paymentService.updatePayment(payment);
        if (payment.type !== PaymentType.COD) {
          await this.orderRepository.save({
            ...newOrder,
            status: OrderStatus.PROCESSING,
          });
        }
      } catch (error) {
        await this.paymentService.setStatus(payment, PaymentStatus.FAILED);
      }
    }
    for (const product of validProducts) {
      const variantDetail = await this.productVariantDetail.findOne({
        where: {
          sku: product.product.sku,
        },
      });
      variantDetail.stock -= product.quantity;
      this.productVariantDetail.save(variantDetail);
    }
    this.cartItemRepository.remove(
      await Promise.all(
        validProducts.map(
          async (product) =>
            await this.cartItemRepository.findOne({
              where: {
                _id: product._id,
              },
            }),
        ),
      ),
    );
    const temp = [];
    Object.values(shop).forEach((x: any) => {
      temp.push(...x);
    });
    return {
      ...order,
      orderItems: temp,
      outofStock,
    };
  }
  async getExistingCard(_id: string) {
    const card = await this.crediCardRepository.find({
      where: {
        customer: {
          _id,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      take: 3,
    });
    return card.map((c) => {
      const { mm, yy, ...data } = c;
      return {
        ...data,
        exp: {
          mm,
          yy,
        },
      };
    });
  }
  async _getOrderPer(
    condition:
      | {
          shop: {
            _id: string;
          };
        }
      | {
          customer: {
            _id: string;
          };
        },
  ) {
    const orders = await this.orderRepository.find({
      where: condition,
      relations: {
        shop: {
          auth: true,
        },
        customer: {
          auth: true,
        },
        orderItems: {
          productVariantDetail: true,
        },
        payment: true,
        address: {
          ward: {
            district: {
              province: true,
            },
          },
        },
      },
    });
    return await Promise.all(
      orders.map(async (order) => {
        const { orderItems, ...data } = order;
        const skus = orderItems.map((x) => x.productVariantDetail.sku);
        const xxx = await Promise.all(
          orderItems.map(async (item) => {
            const [productId, ...option] =
              item.productVariantDetail.sku.split('_');
            const variantDetail = await this.productVariantDetail.findOne({
              where: {
                sku: item.productVariantDetail.sku,
              },
            });
            const product = await this.productRepository.findOne({
              where: {
                _id: +productId,
              },
            });
            const variantOption =
              await this.productVariantOptionRepository.find({
                where: {
                  _id: In(option),
                },
                relations: {
                  productVariant: true,
                },
              });
            const variants = {};
            variantOption.forEach((option) => {
              const { productVariant, ...data } = option;
              variants[productVariant.name] = data;
            });
            delete product.shop;
            delete item.productVariantDetail;
            return {
              ...item,
              product: {
                ...product,
                price: variantDetail.price,
                stock: variantDetail.stock,
                variants,
              },
            };
          }),
        );
        return {
          ...data,
          orderItems: xxx,
        };
      }),
    );
  }
  async getOrdersPerShop(_id: string) {
    const orders = await this._getOrderPer({
      shop: {
        _id,
      },
    });
    return orders.map(({ shop, ...order }) => order);
  }
  async updateOrderStatus(_id: number, status: OrderStatus) {
    const order = await this.orderRepository.findOne({
      where: {
        _id,
      },
    });
    order.status = status;
    return await this.orderRepository.save(order);
  }
  async getAllOrders(customerId: string) {
    const orders = await this._getOrderPer({
      customer: {
        _id: customerId,
      },
    });
    console.log('adfasdf');
    return orders.map(({ customer, ...order }) => order);
  }
  async updateStatusOrder({
    _id,
    status,
  }: {
    _id: number;
    status: OrderStatus;
  }) {
    const order = await this.orderRepository.findOneBy({
      _id,
    });
    if (!order) {
      throw new NotFoundException('Could not found order');
    }
    order.status = status;
    await this.orderRepository.save(order);
    return 'Update status success';
  }
  async getReceipt(_id: number) {
    const order = await this.orderRepository.findOne({
      where: {
        _id,
      },
      relations: {
        shop: {
          shop_address: {
            ward: {
              district: {
                province: true,
              },
            },
          },
        },
        customer: true,
        address: {
          ward: {
            district: {
              province: true,
            },
          },
        },
        orderItems: {
          productVariantDetail: true,
        },
      },
    });
    const orderItems = await Promise.all(
      order.orderItems.map(async (item) => {
        const [productId, ...variantId] =
          item.productVariantDetail.sku.split('_');
        const product = await this.productRepository.findOne({
          where: {
            _id: +productId,
          },
        });
        const { _id, price, stock, sold, ...newProduct } = product;
        const variantOption = await this.productVariantOptionRepository.find({
          where: {
            _id: In(variantId),
          },
          relations: {
            productVariant: true,
          },
        });
        const variants = variantOption.map((variant) => {
          return {
            type: variant.productVariant.name,
            value: variant.value,
            Image: variant.image,
          };
        });
        return {
          ...newProduct,
          price: item.price,
          quantity: item.quantity,
          variants,
        };
      }),
    );

    return {
      ...order,
      orderItems,
    };
  }
}
