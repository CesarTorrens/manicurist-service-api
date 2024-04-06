import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCategoryDto) {
    return this.categoriesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
