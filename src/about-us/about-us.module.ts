import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutUs, AboutUsSchema } from './schemas/about-us.schema';
import { AboutUsController } from './about-us.controller';
import { AboutUsService } from './about-us.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AboutUs.name, schema: AboutUsSchema }]),
  ],
  controllers: [AboutUsController],
  providers: [AboutUsService],
  exports: [AboutUsService],
})
export class AboutUsModule {}
