import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Partners {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true, unique: true })
  subTitle: string;

  @Prop({ required: true, unique: true })
  context: string;

  @Prop({ required: true, unique: true })
  image: string;
}

export const PartnersSchema = SchemaFactory.createForClass(Partners);
