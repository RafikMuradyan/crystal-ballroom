import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Clients {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true, unique: true })
  logo: string;

  @Prop({ required: true, unique: true })
  url: string;
}

export const ClientsSchema = SchemaFactory.createForClass(Clients);
