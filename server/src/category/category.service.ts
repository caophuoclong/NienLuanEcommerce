import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { DataSource, In, Repository } from 'typeorm';
import { TreeCategory } from '../database/entities/category_category.entity';
const queryTreeCategories = (childId: number) => `with recursive getCategories( parent, child) as (
        select parent, child
        from category_category
        where child = ${childId}
        UNION ALL
        select category_category.parent, category_category.child
        from category_category
        join getCategories on getCategories.parent = category_category.child)
    SELECT child, parent
    FROM getCategories;`
@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(TreeCategory)
        private readonly treeCategoryRepository: Repository<TreeCategory>
    ){}
    async findCategory(name: string){
        const response = await this.categoryRepository.find({
            where:{
                name
            }
        })
        return response
    }
    async getCategoriesAndLikely(_id:  number){
        const category = await this.categoryRepository.findOne({
            where:{
                _id
            }
        })
        const childCategory = await this.treeCategoryRepository.find({
            where:{
                parent: _id
            },
            select: ['child']
        })
        const childIds = childCategory.map(x => x.child)
        const likelyCategory = await this.categoryRepository.find({
            where:{
                _id: In(childIds)
            }
        })
        return{
            category,
            child: likelyCategory
        }

    }
    async getParentCategory(child: number){
        const response = await this.treeCategoryRepository.query(queryTreeCategories(child))
        // get tree from response
        const s = new Set();
        for(const x of response){
            const {parent, child} = x;
            // console.log(child, parent)
            s.add(child)
            s.add(parent)
        }
        const categories = await this.categoryRepository.find({
            where:{
                _id: In(Array.from(s))
            }
        })
        return categories;
        // return response
    }
}
