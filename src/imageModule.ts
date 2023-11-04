import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product/service';
import { CreateProductDto } from './product/createProductDto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Post()
  async create(@Body() productDto: CreateProductDto) {
    const createdProduct = await this.productsService.create(productDto);
    return createdProduct;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findOne('id');
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Get()
  async find(
    @Query('category') category: string,
    @Query('productName') productName: string,
    @Query('minPrice', ParseIntPipe) minPrice: number,
    @Query('maxPrice', ParseIntPipe) maxPrice: number,
  ) {
    const products = await this.productsService.find(
      category,
      productName,
      minPrice,
      maxPrice,
    );
    if (products.length === 0) {
      throw new NotFoundException('Products not found');
    }
    return products;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() productDto: CreateProductDto,
  ) {
    const updatedProduct = await this.productsService.update('id', productDto);
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return updatedProduct;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedProduct = await this.productsService.remove('id');
    if (!deletedProduct) {
      throw new NotFoundException('Product not found');
    }
    return { message: 'Product deleted' };
  }
}
