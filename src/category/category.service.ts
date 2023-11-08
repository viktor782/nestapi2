import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';
import { CreateCategoryDto } from './category.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll(categoryName?: string) {
    const filters: Record<string, any> = {};
    if (categoryName) {
      filters.name = { $regex: new RegExp(categoryName, 'i') };
    }
    return this.categoryModel.find(filters).exec();
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    const existingCategory = await this.categoryModel.findOne({ name });
    if (existingCategory) {
      throw new NotFoundException('Категорія вже існує');
    }
    const newCategory = new this.categoryModel({ name });
    return newCategory.save();
  }

  async update(id: string, updateCategoryDto: CreateCategoryDto) {
    const { name } = updateCategoryDto;
    if (!this.isValidObjectId(id)) {
      throw new NotFoundException('Неправильний ідентифікатор категорії');
    }

    const existingCategory = await this.categoryModel.findById(id);
    if (!existingCategory) {
      throw new NotFoundException('Категорія не знайдена');
    }

    existingCategory.name = name;
    return existingCategory.save();
  }

  async remove(id: string) {
    const result = await this.categoryModel.findByIdAndDelete(id);
    return !!result;
  }
  private isValidObjectId(id: string) {
    const mongoose = require('mongoose');
    return mongoose.Types.ObjectId.isValid(id);
  }
}
