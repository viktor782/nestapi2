import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesService } from './category.service';
import { CreateCategoryDto } from './category.dto';
import { Category } from './category.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(@Query('categoryName') categoryName: string) {
    const categories = await this.categoriesService.findAll(categoryName);
    return categories;
  }

  @Post()
  async create(@Body(ValidationPipe) createCategoryDto: CreateCategoryDto) {
    const category = await this.categoriesService.create(createCategoryDto);
    return category;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    const updatedCategory = await this.categoriesService.update(
      id,
      updateCategoryDto,
    );
    if (!updatedCategory) {
      throw new NotFoundException('Категорію не знайдено');
    }
    return updatedCategory;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.categoriesService.remove(id);
    if (!result) {
      throw new NotFoundException('Категорію не знайдено');
    }
    return { message: 'Категорію успішно видалено' };
  }
}
