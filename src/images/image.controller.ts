import {
  Controller,
  Post,
  Delete,
  Param,
  NotFoundException,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FilesInterceptor } from '@nestjs/platform-express/multer';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  async createImage(@UploadedFiles() files: Express.Multer.File[]) {
    const createdImages = await this.imageService.uploadImages(files);
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
