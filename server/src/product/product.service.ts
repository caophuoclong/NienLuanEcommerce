import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductCreateDto } from './dto/product.create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category';
import { Product } from 'src/database/entities/product';
import { Between, Like, Repository } from 'typeorm';
import { ProductGetDTO } from './dto/product.get.dto';
import { CategoryService } from 'src/category/category.service';
import { ProductMeta } from '../database/entities/product/meta';
import { ProductDetail } from '../database/entities/product/detail';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductMeta)
    private readonly productMetaRepository: Repository<ProductMeta>,
    @InjectRepository(ProductDetail)
    private readonly productDetailRepository: Repository<ProductDetail>,
    private readonly categoryService: CategoryService,
  ) {}
  async _parserProduct(
    product: Product,
    meta: ProductMeta[],
    detail: ProductDetail[],
  ) {
    return {
      ...product,
      meta: meta.map((m) => {
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
  async createProduct(dto: ProductCreateDto, shop_id: string) {
    try {
      const { name, category, meta, detail, _id } = dto;
      if (_id === undefined) {
        const newProduct = await this.productRepository.save({
          name: name,
          category: category,
          shop: {
            _id: shop_id,
          },
        });
        const listMetaPromise = meta.map((m) => {
          const { price, stock, images, attribute } = m;
          const newMeta = {
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
            newMeta[`attribute_${i + 1}`] = att.key;
            newMeta[`value_${i + 1}`] = att.value;
          });
          return this.productMetaRepository.save(newMeta);
        });
        const listDetailPromise = detail.map((detail) => {
          return this.productDetailRepository.save({
            product: newProduct,
            key: detail.key,
            value: detail.value,
          });
        });
        const metaResponse = await Promise.all(listMetaPromise);
        const detailResponse = await Promise.all(listDetailPromise);
        return this._parserProduct(newProduct, metaResponse, detailResponse);
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
        shop: true,
      },
    });
    const meta = await this.productMetaRepository.find({
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

    const newProduct = this._parserProduct(product, meta, detail);
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
        meta: true,
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
        meta: re.meta.map(
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
        meta: true,
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
        meta: re.meta.map(
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
        meta: true,
        detail: true,
      },
    });
    return response.map((re) => {
      return {
        ...re,
        meta: re.meta.map(
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
  async editProduct(product: ProductCreateDto) {
    const { _id, category, description, detail, meta, name } = product;
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
    const promiseMeta = meta.map((meta) => {
      const { attribute, ...x } = meta;
      const newMeta: Partial<ProductMeta> = {
        ...x,
        attribute_1: null,
        value_1: null,
        attribute_2: null,
        value_2: null,
      };
      attribute.forEach((att, i) => {
        newMeta[`attribute_${i + 1}`] = att.key;
        newMeta[`value_${i + 1}`] = att.value;
      });
      if (!newMeta._id) {
        const createMeta = this.productMetaRepository.create({
          ...newMeta,
          product: {
            _id: _id,
          },
        });
        return this.productMetaRepository.save(createMeta);
      }
      return this.productMetaRepository.save(newMeta);
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
      await Promise.all(promiseMeta),
    ]);
    return this._parserProduct(response[0], response[2], response[1]);
  }
}
