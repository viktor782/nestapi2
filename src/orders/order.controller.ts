import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Req,
  Put,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from './order.dto';
import { Order } from './order.schema';
import { Request } from 'express';
import { AuthGuard } from '../jwt-and-passport-auth/auth.guard';

@Controller('secure')
export class SecureController {
  @Get()
  @UseGuards(AuthGuard)
  getSecureData() {
    return 'This is a secure endpoint.';
  }
}

@Controller('orders')
@UseGuards(AuthGuard) 
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @Body(ValidationPipe) createOrderDto: CreateOrderDto,
    @Req() req: Request,
  ): Promise<Order> {
    return this.ordersService.create(createOrderDto, req);
  }

  @Get()
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.ordersService.update(id, createOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.ordersService.remove(id);
  }
}
