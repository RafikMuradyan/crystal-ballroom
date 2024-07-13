import { IsOptional, IsString } from 'class-validator';

export class UpdateAboutUsDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly context: string;
}
