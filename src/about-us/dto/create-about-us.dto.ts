import { IsString } from 'class-validator';

export class AboutUsDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly context: string;
}
