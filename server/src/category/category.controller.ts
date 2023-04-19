import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { GetCatePipe } from './pipes/get-cate/get-cate.pipe';
import { CategoryService } from './category.service';
import { CreateCategory } from './dto/create.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { SearchCategories } from './dto/searchCategories';
import { ApiTags } from '@nestjs/swagger';

@Controller('category')
@UseGuards(RolesGuard)
@UsePipes(new ValidationPipe())
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Public()
  @Get('')
  async getCategoriesByName(@Query() query: SearchCategories) {
    return this.categoryService.findCategoryByName(query);
  }
  @Public()
  @Get('/categories')
  async getAllCatgories() {
    return this.categoryService.getAllCategories();
  }
  @Public()
  @Get('/:name')
  async getCategories(@Param('name', new GetCatePipe()) _id: number) {
    return this.categoryService.getCategoriesAndLikely(_id);
  }
  @Public()
  @Get('/id/:id')
  async getCategoryById(@Param('id') _id: number) {
    return this.categoryService.getCategoryById(_id);
  }
  @Roles(RolesEnum.ADMIN)
  @UsePipes(new ValidationPipe())
  @Post('/create')
  async createCategory(@Body() body: CreateCategory) {
    return this.categoryService.createCategory(body);
  }
}
