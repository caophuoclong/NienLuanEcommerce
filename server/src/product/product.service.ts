import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductCreateDto } from './dto/product.create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category';
import { Product } from 'src/database/entities/product';
import { Between, Like, Repository } from 'typeorm';
import { ProductGetDTO } from './dto/product.get.dto';
import { CategoryService } from 'src/category/category.service';
import { ProductVariant } from '../database/entities/product/variant';
import { ProductDetail } from '../database/entities/product/detail';
import { SearchProductDTO } from './dto/searchProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductVariant)
    private readonly productvariantRepository: Repository<ProductVariant>,
    @InjectRepository(ProductDetail)
    private readonly productDetailRepository: Repository<ProductDetail>,
    private readonly categoryService: CategoryService,
  ) {}
  async _parserProduct(
    product: Product,
    variant: ProductVariant[],
    detail: ProductDetail[],
  ) {
    return {
      ...product,
      variant: variant.map((m) => {
        const x = JSON.parse(JSON.stringify(m));
        x.attribute = [];
        delete x.product;
        delete x.attribute_1;
        delete x.attribute_2;
        delete x.value_1;
        delete x.value_2;
        if (m.attribute_1) {
          x.attribute.push({
            key: m.attribute_1,
            value: m.value_1,
          });
        }
        if (m.attribute_2) {
          x.attribute.push({
            key: m.attribute_2,
            value: m.value_2,
          });
        }
        return x;
      }),
      detail: detail.map((d) => {
        delete d.product;
        return d;
      }),
    };
  }
  async _parserProductOnQuery(products: Product[]) {
    return products.map((re) => {
      return {
        ...re,
        variant: re.variant.map(
          ({ attribute_1, attribute_2, value_1, value_2, ...m }) => {
            return {
              ...m,
              attribute: [
                {
                  key: attribute_1,
                  value: value_1,
                },
                {
                  key: attribute_2,
                  value: value_2,
                },
              ],
            };
          },
        ),
      };
    });
  }
  async createProduct(dto: ProductCreateDto, shop_id: string) {
    try {
      const { name, category, variant, detail, _id } = dto;
      if (_id === undefined) {
        const newProduct = await this.productRepository.save({
          name: name,
          category: category,
          shop: {
            _id: shop_id,
          },
        });
        const listvariantPromise = variant.map((m) => {
          const { price, stock, images, attribute } = m;
          const newvariant = {
            product: newProduct,
            price: price,
            stock: stock,
            images: images,
            attribute_1: null,
            value_1: null,
            attribute_2: null,
            value_2: null,
            sold: 0,
          };
          attribute.forEach((att, i) => {
            newvariant[`attribute_${i + 1}`] = att.key
              .toString()
              .toLocaleLowerCase();
            newvariant[`value_${i + 1}`] = att.value
              .toString()
              .toLocaleLowerCase();
          });
          return this.productvariantRepository.save(newvariant);
        });
        const listDetailPromise = detail.map((detail) => {
          return this.productDetailRepository.save({
            product: newProduct,
            key: detail.key,
            value: detail.value,
          });
        });
        const variantResponse = await Promise.all(listvariantPromise);
        const detailResponse = await Promise.all(listDetailPromise);
        return this._parserProduct(newProduct, variantResponse, detailResponse);
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Your data provided is not valid, please try agin!',
      );
    }
    console.log(dto);
    return 'Create product success';
  }
  async getProduct(_id: string) {
    const product = await this.productRepository.findOne({
      where: {
        _id,
      },
      relations: {
        category: true,
        variant: true,
        detail: true,
        shop: true,
      },
    });
    const variant = await this.productvariantRepository.find({
      where: {
        product: {
          _id: product._id,
        },
      },
    });
    const detail = await this.productDetailRepository.findBy({
      product: {
        _id: product._id,
      },
    });
    const category = await this.categoryService.getParentCategory(
      product.category._id,
    );

    const newProduct = this._parserProduct(product, variant, detail);
    return {
      product: await newProduct,
      category,
    };
  }
  async getProducts(dto: Partial<ProductGetDTO>, perPage?: number) {
    const { category, maxPrice, minPrice, name, shop, page = 0 } = dto;
    // return this.categoryService.getParentCategory(category);
    const products = await this.productRepository.find({
      where: [
        {
          shop: {
            _id: shop,
          },
        },
        {
          name: Like(`%${name}%`),
        },
      ],
      relations: {
        category: true,
        variant: true,
        detail: true,
      },
      skip: page * (perPage | 10),
      take: perPage | 10,
    });

    return this._parserProductOnQuery(products);
  }
  async queryProducts(dto: Partial<ProductGetDTO>, perPage?: number) {
    const { category, maxPrice, minPrice, name, shop, page = 0 } = dto;
    // return this.categoryService.getParentCategory(category);
    const products = await this.productRepository.find({
      where: {
        shop: {
          _id: shop,
        },
        name: Like(`%${name}%`),
      },

      relations: {
        category: true,
        variant: true,
        detail: true,
      },
      skip: page * (perPage | 10),
      take: perPage | 10,
    });
    // console.log(products);
    // const productsWithCate = products.map(async (product) => {
    //   const cate = await this.categoryService.getParentCategory(
    //     product.category._id,
    //   );
    //   return {
    //     ...product,
    //     category: cate,
    //   };
    // });
    return products.map((re) => {
      return {
        ...re,
        variant: re.variant.map(
          ({ attribute_1, attribute_2, value_1, value_2, ...m }) => {
            return {
              ...m,
              attribute: [
                {
                  key: attribute_1,
                  value: value_1,
                },
                {
                  key: attribute_2,
                  value: value_2,
                },
              ],
            };
          },
        ),
      };
    });
  }
  async getShopProducts(shop_id: string, page: number, skip: number) {
    const response = await this.productRepository.find({
      where: {
        shop: {
          _id: shop_id,
        },
      },
      relations: {
        category: true,
        variant: true,
        detail: true,
      },
    });
    return this._parserProductOnQuery(response);
  }
  async editProduct(product: ProductCreateDto) {
    const { _id, category, description, detail, variant, name } = product;
    const promiseProduct = this.productRepository
      .findOneBy({
        _id,
      })
      .then((data) => {
        const tmp = {
          ...data,
          name: name,
          description: description,
          category: category,
          updatedAt: Date.now(),
        };
        return this.productRepository.save(tmp);
      });
    const promisevariant = variant.map((variant) => {
      const { attribute, ...x } = variant;
      const newvariant: Partial<ProductVariant> = {
        ...x,
        attribute_1: null,
        value_1: null,
        attribute_2: null,
        value_2: null,
      };
      attribute.forEach((att, i) => {
        newvariant[`attribute_${i + 1}`] = att.key.toString().toLowerCase();
        newvariant[`value_${i + 1}`] = att.value.toString().toLowerCase();
      });
      if (!newvariant._id) {
        const createvariant = this.productvariantRepository.create({
          ...newvariant,
          product: {
            _id: _id,
          },
        });
        return this.productvariantRepository.save(createvariant);
      }
      return this.productvariantRepository.save(newvariant);
    });
    const promiseDetail = detail.map(async (detail) => {
      if (!detail._id) {
        const newDetail = this.productDetailRepository.create({
          ...detail,
          product: {
            _id: _id,
          },
        });
        return this.productDetailRepository.save(newDetail);
      }
      return this.productDetailRepository.save(detail);
    });

    const response = await Promise.all([
      await promiseProduct,
      await Promise.all(promiseDetail),
      await Promise.all(promisevariant),
    ]);
    return this._parserProduct(response[0], response[2], response[1]);
  }
  async getProductsHome({
    perPage = 10,
    page = 0,
  }: {
    perPage: number;
    page: number;
  }) {
    const response = await this.productRepository.find({
      skip: page * perPage,
      take: perPage,
      relations: {
        detail: true,
        variant: true,
        shop: true,
      },
    });
    const re = this._parserProductOnQuery(response);
    // console.log('🚀 ~ file: product.service.ts:333 ~ ProductService ~ re:', re);
    return re;
  }
  async searchProduct({ lang, name }: SearchProductDTO) {
    let products: Array<Product> = [];
    const productByName = await this.productRepository.find({
      where: {
        name: Like(`%${name}%`),
      },
      relations: {
        detail: true,
        variant: true,
      },
    });
    products = [...products, ...productByName];
    const productByCategory = await this.categoryService.repository.find({
      where: {
        [`name_${lang}`]: Like(`%${name}%`),
      },
      relations: {
        products: {
          detail: true,
          variant: true,
        },
      },
    });
    productByCategory.forEach((c) => {
      products = [...products, ...c.products];
    });

    const productByvariant = await this.productvariantRepository.find({
      where: [
        {
          value_1: Like(`%${name}%`),
        },
        {
          value_2: Like(`%${name}%`),
        },
      ],
      relations: {
        product: {
          variant: true,
          detail: true,
        },
      },
    });
    productByvariant.forEach((p) => {
      products = [...products, p.product];
    });
    return this._parserProductOnQuery(this.removeDuplicateItems(products));
  }
  private removeDuplicateItems<
    T extends {
      [key: string]: any;
      _id: string;
    }[],
  >(array: T) {
    const obj: {
      [key: string]: boolean;
    } = {};
    const resultArray: any = [];
    for (let i = 0; i < array.length; i++) {
      const currentItem = array[i];
      if (!obj[currentItem._id]) {
        resultArray.push(array[i]);
        obj[currentItem._id] = true;
      }
    }
    return resultArray as T;
  }
}
