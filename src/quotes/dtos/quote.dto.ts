import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsUUID,
  IsDateString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateQuoteDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly clientName: string;

  @IsNotEmpty()
  @IsDateString()
  readonly date: Date;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly serviceId: string;
}

export class UpdateQuoteDto extends PartialType(CreateQuoteDto) {}
