import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './createProductDto';
import { Product } from './schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel
      .findById(id)
      .populate('category')
      .populate('image')
      .exec();
    return product;
  }

  async find(
    category: string,
    productName: string,
    minPrice: number,
    maxPrice: number,
  ): Promise<Product[]> {
    const filters: any = {};
    if (category) {
      filters['category.name'] = category;
    }
    if (productName) {
      filters.name = { $regex: productName, $options: 'i' };
    }
    if (minPrice && maxPrice) {
      filters.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      filters.price = { $gte: minPrice };
    } else if (maxPrice) {
      filters.price = { $lte: maxPrice };
    }
    return this.productModel
      .find(filters)
      .populate('category')
      .populate('image');
  }

  async update(
    id: string,
    updateProductDto: CreateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );
    return updatedProduct;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.productModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Product not found');
    }
    return true;
  }
}
