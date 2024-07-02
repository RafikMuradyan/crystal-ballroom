import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Characteristics {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true, unique: true })
  context: string;
}

export const CharacteristicsSchema =
  SchemaFactory.createForClass(Characteristics);
