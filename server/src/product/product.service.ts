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
    try{
const { name, category, meta, detail } = dto;
    const newProduct = await this.productRepository.save({
      name: name,
      category: category,
      shop: {
        _id: shop_id
      }
    });
    const listMetaPromise = meta.map((m) => {
      const { price, stock, images, ...attribute } = m;
      const one: {
        key: string;
        value: any;
      } = {
        key: "default",
        value: "default"
      };
      const two: {
        key: string;
        value: any;
      } = {
        key: "default",
        value: "default"
      };
      Object.entries(attribute).forEach((value, index) => {
        switch (index) {
          case 0:
            one.key = value[0];
            one.value = value[1];
            break;
          case 1:
            two.key = value[0];
            two.value = value[1];
            break;
          default:
            throw new Error("It's only two attributes");
        }
      });
      return this.productMetaRepository.save({
        product: newProduct,
        price: price,
        stock: stock,
        images: images,
        attribute_1: one.key,
        value_1: one.value,
        attribute_2: two.key,
        value_2: two.value,
      });
    });
    const listDetailPromise = Object.entries(detail).map((value)=>{
        return this.productDetailRepository.save({
            product: newProduct,
            key: value[0],
            value: value[1],
        })

    })
    const metaResponse = await Promise.all(listMetaPromise);
    const detailResponse = await Promise.all(listDetailPromise);
    return {
        ...newProduct,
        meta: metaResponse.map(m => {
            const {product, ... data} = m;
            return data
        }),
        detail: detailResponse.map(d => {
            const {product, ... data} = d;
            return data
        })
    }
    }catch(error){
        throw new BadRequestException("Your data provided is not valid, please try agin!")
    }
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
        // {
        //     price: Between(minPrice, maxPrice)

        // }
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
  async getShopProducts(shop_id: string, page: number, skip: number){
    console.log("🚀 ~ file: product.service.ts:160 ~ ProductService ~ getShopProducts ~ shop_id", shop_id)
    const response = await this.productRepository.find({
      where:{
        shop:{
          _id: shop_id
        }
      },
      relations:{
        category: true,
        meta: true,
        detail: true,
        
      }
    })
    return response;
  }
}
