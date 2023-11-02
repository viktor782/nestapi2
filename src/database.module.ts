import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:yourpassword@cluster0.2co4irn.mongodb.net/yourdatabase',
    ),
  ],
})
export class DatabaseModule {}
