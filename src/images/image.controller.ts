import {
  Controller,
  Post,
  Delete,
  Param,
  NotFoundException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createImage(@UploadedFile() file: Express.Multer.File) {
    const createdImages = await this.imageService.uploadImage(file);
    return createdImages;
  }

  @Delete(':id')
  async deleteImage(@Param('id') id: string) {
    const deletedImage = await this.imageService.deleteImage(id);

    if (!deletedImage) {
      throw new NotFoundException('Image not found');
    }
    return { message: 'Image deleted' };
  }
}
