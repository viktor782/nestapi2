import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  HttpException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ProductService } from './service';
import { CreateProductDto } from './createProductDto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const createdProduct = await this.productService.create(createProductDto);
    return createdProduct;
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  @Get()
  async getProducts(
    @Query('category') category: string,
    @Query('productName') productName: string,
    @Query('minPrice') minPrice: number,
    @Query('maxPrice') maxPrice: number,
    @Query('images') images: string,
  ) {
    return this.productService.find( category, productName, minPrice, maxPrice,);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ) {
    const updatedProduct = await this.productService.update(
      id,
      updateProductDto,
    );
    if (!updatedProduct) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return updatedProduct;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const result = await this.productService.delete(id);
    if (!result) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Product deleted' };
  }
}
