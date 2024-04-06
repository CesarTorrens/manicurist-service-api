import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  MinLength,
  IsUUID,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateServiceQuoteDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly status: boolean;

  @IsString()
  @IsUUID()
  readonly categoryId: string;
}

export class UpdateServiceQuoteDto extends PartialType(CreateServiceQuoteDto) {}
