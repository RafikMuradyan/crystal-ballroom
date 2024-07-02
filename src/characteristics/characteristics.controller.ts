import { Controller } from '@nestjs/common';
import { CharacteristicsService } from './characteristics.service';

@Controller('characteristics')
export class CharacteristicsController {
  constructor(private characteristicsService: CharacteristicsService) {}
}
