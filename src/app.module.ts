import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ProductModule } from './product/modules';
import { OrdersModule } from './orders/order.modules';
import { CategoriesModule } from './category/category.modules';
import { AuthMiddleware } from './auth.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ImageModule } from './images/image.module';

@Module({
  imports: [
    ImageModule,
    AuthModule,
    CategoriesModule,
    ProductModule,
    OrdersModule,
    MongooseModule.forRoot(
      'mongodb+srv://root:root@cluster0.2co4irn.mongodb.net/?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot({
      load: [
        () => ({
          database: {
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT, 10) || 3000,
          },
        }),
      ],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
      }),
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'orders', method: RequestMethod.ALL });
  }
}
