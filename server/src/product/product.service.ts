import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductCreateDto } from './dto/product.create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category';
import { Product } from 'src/database/entities/product';
import { Between, In, Like, Repository } from 'typeorm';
import { ProductGetDTO } from './dto/product.get.dto';
import { CategoryService } from 'src/category/category.service';
import { ProductVariant } from '../database/entities/product/variant';
import { ProductDetail } from '../database/entities/product/detail';
import { SearchProductDTO } from './dto/searchProduct.dto';
import { ProductVariantDetail } from '../database/entities/product/variant/detail';
import { ProductVariantOption } from '../database/entities/product/variant/options';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductVariant)
    private readonly productVariantRepository: Repository<ProductVariant>,
    @InjectRepository(ProductVariantDetail)
    private readonly productVariantDetailRepository: Repository<ProductVariantDetail>,
    @InjectRepository(ProductVariantOption)
    private readonly productVariantOptionRepository: Repository<ProductVariantOption>,
    @InjectRepository(ProductDetail)
    private readonly productDetailRepository: Repository<ProductDetail>,
    private readonly categoryService: CategoryService,
  ) {}
  // async _parserProduct(
  //   product: Product,
  //   variant: ProductVariant[],
  //   detail: ProductDetail[],
  // ) {
  //   return {
  //     ...product,
  //     variant: variant.map((m) => {
  //       const x = JSON.parse(JSON.stringify(m));
  //       x.attribute = [];
  //       delete x.product;
  //       delete x.attribute_1;
  //       delete x.attribute_2;
  //       delete x.value_1;
  //       delete x.value_2;
  //       if (m.attribute_1) {
  //         x.attribute.push({
  //           key: m.attribute_1,
  //           value: m.value_1,
  //         });
  //       }
  //       if (m.attribute_2) {
  //         x.attribute.push({
  //           key: m.attribute_2,
  //           value: m.value_2,
  //         });
  //       }
  //       return x;
  //     }),
  //     detail: detail.map((d) => {
  //       delete d.product;
  //       return d;
  //     }),
  //   };
  // }
  // async _parserProductOnQuery(products: Product[]) {
  //   return products.map((re) => {
  //     return {
  //       ...re,
  //       variant: re.variant.map(
  //         ({ attribute_1, attribute_2, value_1, value_2, ...m }) => {
  //           return {
  //             ...m,
  //             attribute: [
  //               {
  //                 key: attribute_1,
  //                 value: value_1,
  //               },
  //               {
  //                 key: attribute_2,
  //                 value: value_2,
  //               },
  //             ],
  //           };
  //         },
  //       ),
  //     };
  //   });
  // }
  async createProduct(dto: ProductCreateDto, shop_id: string) {
    try {
      const {
        name,
        category,
        variants,
        detail,
        variantDetails,
        hasVariant,
        description,
        stock,
        price,
        images,
      } = dto;
      if (!hasVariant) {
        const newProduct = await this.productRepository.save({
          name,
          category,
          shop: {
            _id: shop_id,
          },
          price,
          stock,
          hasVariant: false,
        });
        const listPromise = await Promise.all(
          detail.map(async (de) => {
            return await this.productDetailRepository.save({
              key: de.key,
              value: de.value,
              deleted: false,
              product: newProduct,
            });
          }),
        );
        return {
          ...newProduct,
          detail: listPromise,
        };
      } else {
        const newProduct = await this.productRepository.save({
          name,
          category,
          shop: {
            _id: shop_id,
          },
          hasVariant: true,
          description,
        });
        const listVariant = await Promise.all(
          variants
            .map((va) => va.type)
            .map(async (name) => {
              const existVariant =
                await this.productVariantRepository.findOneBy({
                  name,
                });
              if (existVariant) {
                return existVariant;
              } else {
                return await this.productVariantRepository.save({
                  name,
                });
              }
            }),
        );
        const variantsOptions = await Promise.all(
          listVariant.map(async ({ name, _id }) => {
            const variant = variants.find((v) => v.type === name);
            return {
              type: variant.type,
              options: await Promise.all(
                variant.options.map(async ({ _id: _id1, ...option }) => {
                  const {
                    _id: _id2,
                    image,
                    value,
                  } = await this.productVariantOptionRepository.save({
                    ...option,
                    productVariant: {
                      _id,
                    },
                    product: {
                      _id: newProduct._id,
                    },
                  });
                  return {
                    _id: _id2,
                    value,
                    image,
                  };
                }),
              ),
            };
          }),
        );
        const tempOptions = [];
        variantsOptions.forEach((vo) =>
          vo.options.forEach((o) => tempOptions.push(o)),
        );
        const listPromiseVariantDetails = await Promise.all(
          variantDetails.map(async (vd) => {
            const key = vd.key.split('_');
            const result = tempOptions
              .filter((to) => key.includes(to.value))
              .map((v) => v._id);
            const sku = `${newProduct._id}_${result.join('_')}`;
            return await this.productVariantDetailRepository.save({
              sku,
              price: vd.price,
              stock: vd.stock,
              key: vd.key,
            });
          }),
        );
        const listPromise = await Promise.all(
          detail.map(async (de) => {
            return await this.productDetailRepository.save({
              key: de.key,
              value: de.value,
              deleted: false,
              product: newProduct,
            });
          }),
        );
        return {
          ...newProduct,
          variants: variantsOptions,
          variantDetails: listPromiseVariantDetails,
          detail: listPromise.map(({ product, ...data }) => ({
            ...data,
          })),
        };
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Your data provided is not valid, please try agin!',
      );
    }
  }
  async _getProdctInformation(product: Product) {
    const { _id } = product;
    const variants = await this.productVariantOptionRepository.find({
      where: {
        product: {
          _id,
        },
      },
      relations: ['productVariant'],
      select: {
        productVariant: {
          name: true,
        },
      },
    });
    const groupVariants: {
      type: string;
      options: {
        _id: number;
        value: string;
        image: string;
      }[];
    }[] = [];
    variants.forEach((variant) => {
      const isExist = groupVariants.find(
        (v) => v.type === variant.productVariant.name,
      );
      if (!isExist) {
        groupVariants.push({
          type: variant.productVariant.name,
          options: [
            {
              _id: variant._id,
              image: variant.image,
              value: variant.value,
            },
          ],
        });
      } else {
        isExist.options.push({
          _id: variant._id,
          image: variant.image,
          value: variant.value,
        });
      }
    });
    const variantDetails = await this.productVariantDetailRepository.find({
      where: {
        sku: Like(`%${product._id}%`),
      },
    });
    const shopsProduct = await this.productRepository.findAndCount({
      where: {
        shop: {
          _id: product.shop._id,
        },
      },
    });
    const result = {
      ...product,
      shop: {
        ...product.shop,
        productLength: shopsProduct[1],
      },
      variants: groupVariants,
      variantDetails,
    };
    return result;
  }
  async getProduct(_id: number) {
    const product = await this.productRepository.findOne({
      where: {
        _id,
      },
      relations: {
        category: true,
        detail: true,
        shop: {
          auth: true,
        },
      },
    });

    return await this._getProdctInformation(product);
    // const variant = await this.productvariantRepository.find({
    //   where: {
    //     product: {
    //       _id: product._id,
    //     },
    //   },
    // });
    // const detail = await this.productDetailRepository.findBy({
    //   product: {
    //     _id: product._id,
    //   },
    // });
    // const category = await this.categoryService.getParentCategory(
    //   product.category._id,
    // );
    // const newProduct = this._parserProduct(product, variant, detail);
    // return {
    //   product: await newProduct,
    //   category,
    // };
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

    // return this._parserProductOnQuery(products);
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
    // return products.map((re) => {
    //   return {
    //     ...re,
    //     variant: re.variant.map(
    //       ({ attribute_1, attribute_2, value_1, value_2, ...m }) => {
    //         return {
    //           ...m,
    //           attribute: [
    //             {
    //               key: attribute_1,
    //               value: value_1,
    //             },
    //             {
    //               key: attribute_2,
    //               value: value_2,
    //             },
    //           ],
    //         };
    //       },
    //     ),
    //   };
    // });
  }
  async getShopProducts(shop_id: string, page: number, skip: number) {
    const products = await this.productRepository.find({
      where: {
        shop: {
          _id: shop_id,
        },
      },
      relations: {
        category: true,
        detail: true,
        shop: true,
      },
    });
    return await Promise.all(
      products.map(
        async (product) => await this._getProdctInformation(product),
      ),
    );
    // return this._parserProductOnQuery(response);
  }
  async editProduct(product: ProductCreateDto) {
    //   const { _id, category, description, detail, variant, name } = product;
    //   const promiseProduct = this.productRepository
    //     .findOneBy({
    //       _id,
    //     })
    //     .then((data) => {
    //       const tmp = {
    //         ...data,
    //         name: name,
    //         description: description,
    //         category: category,
    //         updatedAt: Date.now(),
    //       };
    //       return this.productRepository.save(tmp);
    //     });
    //   const promisevariant = variant.map((variant) => {
    //     const { attribute, ...x } = variant;
    //     const newvariant: Partial<ProductVariant> = {
    //       ...x,
    //       attribute_1: null,
    //       value_1: null,
    //       attribute_2: null,
    //       value_2: null,
    //     };
    //     attribute.forEach((att, i) => {
    //       newvariant[`attribute_${i + 1}`] = att.key.toString().toLowerCase();
    //       newvariant[`value_${i + 1}`] = att.value.toString().toLowerCase();
    //     });
    //     if (!newvariant._id) {
    //       const createvariant = this.productvariantRepository.create({
    //         ...newvariant,
    //         product: {
    //           _id: _id,
    //         },
    //       });
    //       return this.productvariantRepository.save(createvariant);
    //     }
    //     return this.productvariantRepository.save(newvariant);
    //   });
    //   const promiseDetail = detail.map(async (detail) => {
    //     if (!detail._id) {
    //       const newDetail = this.productDetailRepository.create({
    //         ...detail,
    //         product: {
    //           _id: _id,
    //         },
    //       });
    //       return this.productDetailRepository.save(newDetail);
    //     }
    //     return this.productDetailRepository.save(detail);
    //   });
    //   const response = await Promise.all([
    //     await promiseProduct,
    //     await Promise.all(promiseDetail),
    //     await Promise.all(promisevariant),
    //   ]);
    //   return this._parserProduct(response[0], response[2], response[1]);
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
        shop: true,
        category: true,
      },
    });

    return await Promise.all(
      response.map(async (pr) => await this._getProdctInformation(pr)),
    );
  }
  async searchProduct({ lang, name }: SearchProductDTO) {
    let products: Array<Product> = [];
    const lstName = name.split(' ');
    for (let i = 0; i < lstName.length; i++) {
      const productByName = await this.productRepository.find({
        where: {
          name: Like(`%${lstName[i]}%`),
        },
        relations: {
          detail: true,
          category: true,
          shop: {
            auth: true,
          },
        },
      });
      products = [...products, ...productByName];

      const productByCategory = await this.categoryService.repository.find({
        where: {
          [`name_${lang}`]: Like(`%${lstName[i]}%`),
        },
        relations: {
          products: {
            detail: true,
            category: true,
            shop: {
              auth: true,
            },
          },
        },
      });
      productByCategory.forEach((c) => {
        const ids = products.map((c) => c._id);
        if (!ids.includes(c._id)) {
          products = [...products, ...c.products];
        }
      });
    }

    // const productByvariant = await this.productvariantRepository.find({
    //   where: [
    //     {
    //       value_1: Like(`%${name}%`),
    //     },
    //     {
    //       value_2: Like(`%${name}%`),
    //     },
    //   ],
    //   relations: {
    //     product: {
    //       variant: true,
    //       detail: true,
    //     },
    //   },
    // });
    // productByvariant.forEach((p) => {
    //   products = [...products, p.product];
    // });
    const newProduct = products.filter((x, index) => {
      return index === products.findIndex((pr) => pr._id === x._id);
    });

    return await Promise.all(
      newProduct.map(async (pr) => await this._getProdctInformation(pr)),
    );
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
  async getShopProductsWithUsername(username: string) {
    console.log(username);
    const products = await this.productRepository.find({
      where: {
        shop: {
          auth: {
            username,
          },
        },
      },
      relations: {
        detail: true,
        category: true,
        shop: {
          auth: true,
        },
      },
    });
    return await Promise.all(
      products.map(async (pr) => await this._getProdctInformation(pr)),
    );
  }
  async getCategoryProduct(_id: number) {
    const products = await this.productRepository.find({
      where: {
        category: {
          _id,
        },
      },
      relations: {
        detail: true,
        category: true,
        shop: {
          auth: true,
        },
      },
    });
    return await Promise.all(
      products.map(async (pr) => await this._getProdctInformation(pr)),
    );
  }
}
