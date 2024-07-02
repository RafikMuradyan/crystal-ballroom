import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partners } from './schemas/partners.schema';

@Injectable()
export class PartnersService {
  constructor(
    @InjectModel(Partners.name) private partnersModel: Model<Partners>,
  ) {}
}
