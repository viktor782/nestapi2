import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Product } from './product/schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getProducts() {
    return await this.appService.getProducts();
  }
}
