import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.schema';
import { CreateOrderDto } from './order.dto';
import { Product } from '../product/schema';
import { Request } from 'express';
import { Req } from '@nestjs/common';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
    @Req() req: Request,
  ): Promise<Order> {
    const { products } = createOrderDto;
    let amount = 0;

    const productsData = await this.productModel.find({
      _id: { $in: products },
    });
    productsData.forEach(({ price }) => {
      amount += price || 0;
    });
    const newOrder = new this.orderModel({
      products: productsData,
      userId: req.body.userId,
      amount: amount,
    });

    return newOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().populate('products').exec();
  }

  async findOne(id: string): Promise<Order> {
    return this.orderModel.findById(id).populate('products').exec();
  }

  async update(id: string, createOrderDto: CreateOrderDto): Promise<Order> {
    const { products } = createOrderDto;
    let amount = 0;

    const productsData = await this.productModel.find({
      _id: { $in: products },
    });
    productsData.forEach(({ price }) => {
      amount += price || 0;
    });

    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      id,
      {
        products: productsData,
        amount: amount,
      },
      { new: true },
    );

    return updatedOrder;
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.orderModel.findByIdAndDelete(id);
    return !!result;
  }
}
