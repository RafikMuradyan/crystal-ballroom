import { Body, Controller, Post, UploadedFile } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { AboutUsDto } from './dto/create-about-us.dto';
import { AboutUs } from './schemas/about-us.schema';
import { UploadFile } from '../decorators/upload-file.decorator';

@Controller('about-us')
export class AboutUsController {
  constructor(private aboutUsService: AboutUsService) {}

  @Post()
  @UploadFile('file')
  async create(
    @Body() createAboutUsDto: AboutUsDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<AboutUs> {
    const aboutUs = await this.aboutUsService.create(
      createAboutUsDto,
      file.filename,
    );
    return aboutUs;
  }
}
