import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find({ relations: ['services'] });
  }

  async findOne(id: string): Promise<Category | object> {
    const category = await this.categoriesRepository.findOneOrFail({
      where: { id },
      relations: ['services'],
    });

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(category: CreateCategoryDto): Promise<Category> {
    const existCategory = await this.categoriesRepository.find({
      where: { name: category.name },
    });

    if (existCategory.length) {
      throw new NotFoundException(`Category ${category.name} already exists`);
    }
    return await this.categoriesRepository.save(category);
  }

  async update(
    id: string,
    changes: UpdateCategoryDto,
  ): Promise<Category | object> {
    await this.findOne(id);
    const categoryUpdated = await this.categoriesRepository.update(id, changes);
    return categoryUpdated;
  }

  async remove(id: string): Promise<object> {
    await this.findOne(id);
    await this.categoriesRepository.delete(id);
    return { message: `Category deleted successfully ${id}` };
  }
}
