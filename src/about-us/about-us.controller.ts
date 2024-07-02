import { Controller } from '@nestjs/common';
import { AboutUsService } from './about-us.service';

@Controller('about-us')
export class AboutUsController {
  constructor(private aboutUsService: AboutUsService) {}
}
