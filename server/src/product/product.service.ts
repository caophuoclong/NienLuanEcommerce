import { Injectable } from '@nestjs/common';
import { ProductCreateDto } from './dto/product.create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { Product } from 'src/database/entities/product';
import { Between, Like, Repository } from 'typeorm';
import { ProductGetDTO } from './dto/product.get.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly categoryService: CategoryService
    ){}
    async createProduct(dto: ProductCreateDto, shop_id: string){
        const {name, price, description, category} = dto;
        const product = await this.productRepository.save({
            name,
            price,
            description,
            category: {
                _id: category
            },
            shop: {
                _id: shop_id
            }
        })
        return product;
    }
    async getProduct(_id: string){
        const product =  await this.productRepository.findOne({
            where: {
                _id
            },
            relations: {
                category: true,
                shop: true,
            }
        });
        const category = await this.categoryService.getParentCategory(product.category._id);
        return {
            ...product,
            category
        }
    }
    async getProducts(dto: ProductGetDTO){
        const {category, maxPrice,minPrice,name,shop, page = 0} = dto;
        const perPage = 10;
        // return this.categoryService.getParentCategory(category);
        const products = await this.productRepository.find({
            where: [
                {
                    shop: {
                        _id: shop
                    },
                },
                {
                    category: {
                        _id: category
                    }
                },
                {
                    name: Like(`%${name}%`)
                },
                {
                    price: Between(minPrice, maxPrice)
                   
                }
            ],
            relations:{
                category: true,
                shop: true
            },
            skip: page * perPage,
            take: perPage
        })
        const productsWithCate = products.map(async(product)=>{
            const cate = await this.categoryService.getParentCategory(product.category._id);
            return {
                ...product,
                category: cate
            }
        })
        return await Promise.all(productsWithCate);
        
    }
}
