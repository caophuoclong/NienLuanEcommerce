import { Module, forwardRef } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category';
import { TreeCategory } from 'src/database/entities/category/category_category.entity';
import { CategoryController } from './category.controller';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports:[TypeOrmModule.forFeature([Category, TreeCategory]), forwardRef(()=> ProductModule)],
  providers: [CategoryService],
  exports: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
