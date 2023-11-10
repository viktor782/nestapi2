import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './image.schema';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

@Injectable()
export class ImageService {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}

  async createImage(path: string) {
    const newImage = new this.imageModel({ path });
    return newImage.save();
  }

  async deleteImage(id: string) {
    const image = await this.imageModel.findById(id);
    if (!image) {
      throw new BadRequestException('Image not found');
    }
    fs.unlinkSync(image.path);

    return this.imageModel.findByIdAndDelete(id);
  }

  async uploadImage(file: Express.Multer.File) {
    const uniqueFilename = `${uuidv4()}-${file.originalname}`;
    const filePath = path.join('uploads', uniqueFilename);

    fs.writeFileSync(filePath, file.buffer);

    const newImage = new this.imageModel({ path: filePath });
    const savedImage = await newImage.save();

    return savedImage;
  }
}
