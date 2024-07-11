import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { AboutUsDto } from './dto/create-about-us.dto';
import { AboutUs } from './schemas/about-us.schema';

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'dist/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

@Controller('about-us')
export class AboutUsController {
  constructor(private aboutUsService: AboutUsService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async yesim(
    @UploadedFile() file,
    @Body() aboutUs: AboutUsDto,
  ): Promise<AboutUs> {
    return this.aboutUsService.create(aboutUs, file.filename);
  }
}
