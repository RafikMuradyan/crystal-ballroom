import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Characteristics } from './schemas/characteristics.schema';

@Injectable()
export class CharacteristicsService {
  constructor(
    @InjectModel(Characteristics.name)
    private characteristicsModel: Model<Characteristics>,
  ) {}
}
