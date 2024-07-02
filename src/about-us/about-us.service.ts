import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AboutUs } from './schemas/about-us.schema';

@Injectable()
export class AboutUsService {
  constructor(
    @InjectModel(AboutUs.name) private aboutUsModel: Model<AboutUs>,
  ) {}
}
