import { Injectable, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as multer from 'multer';
import { Document } from 'mongoose';

export interface ImageDocument extends Document {
  path: string;
}

@Injectable()
export class ImageService {
  constructor(@InjectModel('Image') private imageModel: Model<ImageDocument>) {}

  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'uploads/',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extname = path.extname(file.originalname);
          cb(null, file.fieldname + '-' + uniqueSuffix + extname);
        },
      }),
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImageDocument> {
    const image = new this.imageModel({ path: file.filename });
    return await image.save();
  }
}
