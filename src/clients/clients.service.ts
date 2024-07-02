import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clients } from './schemas/clients.schema';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Clients.name) private clinetsModel: Model<Clients>,
  ) {}
}
