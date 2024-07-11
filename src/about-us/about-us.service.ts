import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AboutUs } from './schemas/about-us.schema';
import { AboutUsDto } from './dto/create-about-us.dto';

@Injectable()
export class AboutUsService {
  constructor(
    @InjectModel(AboutUs.name) private aboutUsModel: Model<AboutUs>,
  ) {}

  async create(aboutUs: AboutUsDto, filename: string) {
    const existingData = await this.aboutUsModel.findOne({
      title: aboutUs.title,
    });

    if (existingData) {
      throw new ConflictException('Data with this title already exists');
    }

    const createdData = new this.aboutUsModel({
      image: filename,
      ...aboutUs,
    });

    return createdData.save();
  }
}
