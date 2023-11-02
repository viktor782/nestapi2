import { Injectable } from '@nestjs/common';
import { ProductService } from './product/service';
import { Product } from './product/schema';

@Injectable()
export class AppService {
  constructor(private readonly productService: ProductService) {}

  async getProducts(): Promise<Product[]> {
    return await this.productService.findAll();
  }
}
