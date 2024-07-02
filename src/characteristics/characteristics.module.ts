import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Characteristics,
  CharacteristicsSchema,
} from './schemas/characteristics.schema';
import { CharacteristicsService } from './characteristics.service';
import { CharacteristicsController } from './characteristics.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Characteristics.name, schema: CharacteristicsSchema },
    ]),
  ],
  controllers: [CharacteristicsController],
  providers: [CharacteristicsService],
  exports: [CharacteristicsService],
})
export class CharacteristicsModule {}
