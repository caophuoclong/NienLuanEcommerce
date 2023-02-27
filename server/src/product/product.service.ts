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
  async createProduct(dto: ProductCreateDto, shop_id: string) {
    try {
      const { name, category, meta, detail } = dto;
      const newProduct = await this.productRepository.save({
        name: name,
        category: category,
        shop: {
          _id: shop_id,
        },
      });
      const listMetaPromise = meta.map((m) => {
        const { price, stock, images, attribute } = m;
        return this.productMetaRepository.save({
          product: newProduct,
          price: price,
          stock: stock,
          images: images,
          attribute_1: attribute[0].key,
          value_1: attribute[0].value,
          attribute_2: attribute[1].key,
          value_2: attribute[1].value,
        });
      });
      const listDetailPromise = Object.entries(detail).map((value) => {
        return this.productDetailRepository.save({
          product: newProduct,
          key: value[0],
          value: value[1],
        });
      });
      const metaResponse = await Promise.all(listMetaPromise);
      const detailResponse = await Promise.all(listDetailPromise);
      return {
        ...newProduct,
        meta: metaResponse.map(m => {
          const x = JSON.parse(JSON.stringify(m));
          delete x.product;
          delete x.attribute_1;
          delete x.attribute_2;
          delete x.value_1;
          delete x.value_2;
          x.attribute = [{
            key: m.attribute_1,
            value: m.value_1
          }, {
            key: m.attribute_2,
            value: m.value_2
          }];
          return x;
        } ),
        detail: detailResponse.map(d => {
          delete d.product;
          return d;
        } ),
      };
    } catch (error) {
      throw new BadRequestException(
        'Your data provided is not valid, please try agin!',
      );
    }
    console.log(dto);
    return "Create product success"; 
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
    const category = await this.categoryService.getParentCategory(
      product.category._id,
    );
    return {
      ...product,
      category,
    };
  }
  async getProducts(dto: ProductGetDTO) {
    const { category, maxPrice, minPrice, name, shop, page = 0 } = dto;
    const perPage = 10;
    // return this.categoryService.getParentCategory(category);
    const products = await this.productRepository.find({
      where: [
        {
          shop: {
            _id: shop,
          },
        },
        {
          category: {
            _id: category,
          },
        },
        {
          name: Like(`%${name}%`),
        },
      ],
      relations: {
        category: true,
        shop: true,
      },
      skip: page * perPage,
      take: perPage,
    });
    const productsWithCate = products.map(async (product) => {
      const cate = await this.categoryService.getParentCategory(
        product.category._id,
      );
      return {
        ...product,
        category: cate,
      };
    });
    return await Promise.all(productsWithCate);
  }
  async getShopProducts(shop_id: string, page: number, skip: number) {
    console.log(
      '🚀 ~ file: product.service.ts:160 ~ ProductService ~ getShopProducts ~ shop_id',
      shop_id,
    );
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
    return response.map(re => {
      return {
        ...re,
        meta: re.meta.map(({attribute_1, attribute_2,value_1, value_2, ...m}) => {
          return {
            ...m,
            attribute: [
              {
                key: attribute_1,
                value: value_1
              },{
                key: attribute_2,
                value: value_2
              }
            ]
          }
        })
      }
    });
  }
}
