import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { AboutUs } from './schemas/about-us.schema';
import { AboutUsDto } from './dto/create-about-us.dto';

@Injectable()
export class AboutUsService {
  constructor(
    @InjectModel(AboutUs.name) private aboutUsModel: Model<AboutUs>,
  ) {}

  async create(
    createAboutUsDto: AboutUsDto,
    filename: string,
  ): Promise<AboutUs> {
    try {
      const existingData = await this.aboutUsModel.findOne({
        title: createAboutUsDto.title,
      });

      if (existingData) {
        throw new ConflictException('Data with this title already exists');
      }

      const createdAboutUs = new this.aboutUsModel({
        ...createAboutUsDto,
        image: filename,
      });
      const aboutUs = await createdAboutUs.save();
      return aboutUs;
    } catch (error) {
      const filePath = path.join('dist/uploads', filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Failed to delete file:', err);
        } else {
          console.log(`File ${filename} deleted successfully`);
        }
      });
      console.log(error, 'error');
      throw new InternalServerErrorException(
        `Could not create AboutUs data: ${error.message}`,
      );
    }
  }
}
