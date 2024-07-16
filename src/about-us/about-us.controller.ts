import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { AboutUsDto } from './dto/create-about-us.dto';
import { AboutUs } from './schemas/about-us.schema';
import { UploadFile } from '../decorators/upload-file.decorator';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';

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

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res) {
    try {
      const result = await this.aboutUsService.delete(id);
      return res.status(HttpStatus.OK).json({
        message: 'AboutUs entry deleted successfully',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res) {
    try {
      const aboutUs = await this.aboutUsService.findById(id);
      return res.status(HttpStatus.OK).json(aboutUs);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Put(':id')
  @UploadFile('file')
  async update(
    @Param('id') id: string,
    @Body() updateAboutUsDto: UpdateAboutUsDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<AboutUs> {
    const updatedAboutUs = await this.aboutUsService.update(
      id,
      updateAboutUsDto,
      file?.filename,
    );
    return updatedAboutUs;
  }
}
