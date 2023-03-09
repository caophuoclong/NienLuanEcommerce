import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category';
import { DataSource, In, Repository } from 'typeorm';
import { TreeCategory } from '../database/entities/category/category_category.entity';
import { CreateCategory } from './dto/create.dto';
import { SearchCategories } from './dto/searchCategories';
const queryTreeCategories = (
  childId: number,
) => `with recursive getCategories( parent, child) as (
        select parent, child
        from category_category
        where child = ${childId}
        UNION ALL
        select category_category.parent, category_category.child
        from category_category
        join getCategories on getCategories.parent = category_category.child)
    SELECT child, parent
    FROM getCategories;`;
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(TreeCategory)
    private readonly treeCategoryRepository: Repository<TreeCategory>,
  ) {}

  public get repository(): Repository<Category> {
    return this.categoryRepository;
  }

  async getCategoryById(_id: number) {
    const response = await this.categoryRepository.findOne({
      where: {
        _id,
      },
    });
    return response;
  }
  async findCategoryByName(data: SearchCategories) {
    const { name, lang } = data;
    const x = await this.categoryRepository
      .createQueryBuilder()
      .where(
        `
    name_${lang} like :name
    `,
        { name: `%${name}%` },
      )
      .execute();
    return x.map((i) => ({
      _id: i['Category__id'],
      name_en: i[`Category_name_en`],
      name_vi: i[`Category_name_vi`],
      requireDetail: i[`Category_requireDetail`],
      createdAt: i[`Category_createdAt`],
    }));
  }
  async createCategory(data: CreateCategory) {
    const { name, requireDetail, parent = 0 } = data;
    const category = await this.categoryRepository.save({
      name,
      requireDetail,
    });
    await this.treeCategoryRepository.save({
      parent,
      child: category._id,
    });
    return category;
  }
  async getCategoriesAndLikely(_id: number) {
    const category = await this.categoryRepository.findOne({
      where: {
        _id,
      },
    });
    const childCategory = await this.treeCategoryRepository.find({
      where: {
        parent: _id,
      },
      select: ['child'],
    });
    const childIds = childCategory.map((x) => x.child);
    const likelyCategory = await this.categoryRepository.find({
      where: {
        _id: In(childIds),
      },
    });
    return {
      category,
      child: likelyCategory,
    };
  }
  async getParentCategory(child: number) {
    const response = await this.treeCategoryRepository.query(
      queryTreeCategories(child),
    );

    // get tree from response
    const s = new Set();

    for (const x of response) {
      const { parent, child } = x;
      s.add(child);
      s.add(parent);
    }

    const categories = await this.categoryRepository.find({
      where: {
        _id: In(Array.from(s)),
      },
    });
    return categories;
    // return response
  }
}
