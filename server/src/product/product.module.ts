import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariant } from 'src/database/entities/product/variant';
import { Product } from '../database/entities/product/index';
import { CategoryModule } from '../category/category.module';
import { ProductDetail } from 'src/database/entities/product/detail';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductVariant, ProductDetail]),
    forwardRef(() => CategoryModule),
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
