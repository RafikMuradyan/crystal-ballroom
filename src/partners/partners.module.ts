import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Partners, PartnersSchema } from './schemas/partners.schema';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Partners.name, schema: PartnersSchema },
    ]),
  ],
  controllers: [PartnersController],
  providers: [PartnersService],
  exports: [PartnersService],
})
export class PartnersModule {}
