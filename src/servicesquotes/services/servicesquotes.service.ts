import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CreateServiceQuoteDto,
  UpdateServiceQuoteDto,
} from '../dtos/servicequote.dto';
import { ServicesQuotes } from '../entities/servicesquotes.entity';
import { CategoriesService } from 'src/categories/services/categories.service';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ServicesquotesService {
  constructor(
    @InjectRepository(ServicesQuotes)
    private readonly servicesQuotesRepository: Repository<ServicesQuotes>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async findAll(): Promise<ServicesQuotes[]> {
    return this.servicesQuotesRepository.find({ relations: ['category'] });
  }

  async findOne(id: string): Promise<ServicesQuotes> {
    const servicesQuotes = await this.servicesQuotesRepository.findOneOrFail({
      where: { id },
      relations: ['category'],
    });
    if (!servicesQuotes) {
      throw new NotFoundException(`ServicesQuotes #${id} not found`);
    }
    return servicesQuotes;
  }

  async create(servicesQuotes: CreateServiceQuoteDto): Promise<ServicesQuotes> {
    const existServicesQuotes = await this.servicesQuotesRepository.find({
      where: { name: servicesQuotes.name },
    });

    if (existServicesQuotes.length) {
      throw new NotFoundException(
        `ServicesQuotes ${servicesQuotes.name} already exists`,
      );
    }

    if (!servicesQuotes.categoryId) {
      throw new NotFoundException('Category id is required');
    }

    const newServicesQuotes =
      this.servicesQuotesRepository.create(servicesQuotes);

    const category = await this.categoriesService.findOne(
      servicesQuotes.categoryId,
    );
    newServicesQuotes.category = category as Category;
    return await this.servicesQuotesRepository.save(newServicesQuotes);
  }

  async update(
    id: string,
    changes: UpdateServiceQuoteDto,
  ): Promise<ServicesQuotes | object> {
    const ServicesQuotes = await this.findOne(id);

    if (changes.categoryId) {
      const category = await this.categoriesService.findOne(changes.categoryId);
      ServicesQuotes.category = category as Category;
    }

    this.servicesQuotesRepository.merge(ServicesQuotes, changes);
    console.log(ServicesQuotes);
    await this.servicesQuotesRepository.update(id, ServicesQuotes);
    return await this.servicesQuotesRepository.save(ServicesQuotes);
  }

  async remove(id: string): Promise<object> {
    await this.findOne(id);
    await this.servicesQuotesRepository.delete(id);
    return { message: `ServicesQuotes deleted successfully ${id}` };
  }
}
