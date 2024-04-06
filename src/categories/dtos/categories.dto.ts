import { IsString, IsNotEmpty, IsBoolean, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly name: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly status: boolean;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
