import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateMailcollectionDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  sourceURL?: string;
}
