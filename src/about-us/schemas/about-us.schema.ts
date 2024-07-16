import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class AboutUs {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  context: string;

  @Prop({ required: true, unique: true })
  image: string;
}

export const AboutUsSchema = SchemaFactory.createForClass(AboutUs);
