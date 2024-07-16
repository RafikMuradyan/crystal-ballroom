import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { AboutUs } from './schemas/about-us.schema';
import { AboutUsDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';

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
      const filePath = path.join('uploads', filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Failed to delete file:', err);
        } else {
          console.log(`File ${filename} deleted successfully`);
        }
      });

      throw error;
    }
  }

  async delete(id: string): Promise<AboutUs> {
    try {
      const aboutUs = await this.aboutUsModel.findById(id);

      if (!aboutUs) {
        throw new NotFoundException(`AboutUs entry with ID ${id} not found`);
      }

      const filename = aboutUs.image;
      const filePath = path.join('uploads', filename);

      await this.aboutUsModel.findByIdAndDelete(id);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Failed to delete file:', err);
        } else {
          console.log(`File ${filename} deleted successfully`);
        }
      });

      return aboutUs;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<AboutUs> {
    try {
      const aboutUs = await this.aboutUsModel.findById(id);

      if (!aboutUs) {
        throw new NotFoundException(`AboutUs entry with ID ${id} not found`);
      }

      return aboutUs;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateAboutUsDto: UpdateAboutUsDto,
    newFilename?: string,
  ): Promise<AboutUs> {
    try {
      const aboutUs = await this.aboutUsModel.findById(id);

      if (!aboutUs) {
        throw new NotFoundException(`AboutUs entry with ID ${id} not found`);
      }

      if (newFilename) {
        const oldFilePath = path.join('uploads', aboutUs.image);
        fs.unlink(oldFilePath, (err) => {
          if (err) {
            console.error('Failed to delete old file:', err);
          } else {
            console.log(`Old file ${aboutUs.image} deleted successfully`);
          }
        });
        aboutUs.image = newFilename;
      }

      Object.assign(aboutUs, updateAboutUsDto);
      return await aboutUs.save();
    } catch (error) {
      if (newFilename) {
        const newFilePath = path.join('uploads', newFilename);
        fs.unlink(newFilePath, (err) => {
          if (err) {
            console.error('Failed to delete new file:', err);
          } else {
            console.log(`New file ${newFilename} deleted successfully`);
          }
        });
      }
      throw error;
    }
  }
}
