import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { Image, ImageSchema } from './image.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    MulterModule.registerAsync({
      useFactory: () => {
        return {};
      },
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
