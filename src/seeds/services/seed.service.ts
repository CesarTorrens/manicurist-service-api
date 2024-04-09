import { Injectable } from '@nestjs/common';
import { ServicesquotesService } from 'src/servicesquotes/services/servicesquotes.service';
import { CreateServiceQuoteDto } from 'src/servicesquotes/dtos/servicequote.dto';
import { CategoriesService } from 'src/categories/services/categories.service';
import { CreateCategoryDto } from 'src/categories/dtos/categories.dto';
import * as categoriesData from '../categories.json';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class SeedsService {
  constructor(
    private readonly servicesQuotesService: ServicesquotesService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async seed() {
    const createdCategories = [];
    let category: Category;
    for (const service of categoriesData.services) {
      if (!createdCategories.includes(service.category)) {
        const serviceCategories: CreateCategoryDto = {
          name: service.category,
          status: service.status,
        };
        category = await this.categoriesService.create(serviceCategories);
        createdCategories.push(category.name);
      }
      const serviceQuote: CreateServiceQuoteDto = {
        name: service.name,
        description: service.description,
        status: true,
        categoryId: category.id,
      };

      await this.servicesQuotesService.create(serviceQuote);
    }
  }
}
