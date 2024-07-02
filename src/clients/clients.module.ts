import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Clients, ClientsSchema } from './schemas/clients.schema';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Clients.name, schema: ClientsSchema }]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
