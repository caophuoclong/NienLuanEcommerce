import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { GetCatePipe } from './pipes/get-cate/get-cate.pipe';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ){}
    @Public()
    @Get("/:name")
    async getCategories(@Param('name', new GetCatePipe()) _id: number){
        return this.categoryService.getCategoriesAndLikely(_id);
    }
}
