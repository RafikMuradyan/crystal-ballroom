require('dotenv').config();
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnersModule } from './partners/partners.module';
import { ClientsModule } from './clients/clients.module';
import { AboutUsModule } from './about-us/about-us.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI, {
      dbName: 'crystal-ballroom',
    }),
    CharacteristicsModule,
    AboutUsModule,
    PartnersModule,
    ClientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
