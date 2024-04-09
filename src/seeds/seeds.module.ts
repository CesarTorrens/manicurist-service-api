import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedsService } from './services/seed.service';

import { ServicesquotesController } from 'src/servicesquotes/controllers/servicesquotes.controller';
import { ServicesquotesService } from 'src/servicesquotes/services/servicesquotes.service';
import { ServicesQuotes } from 'src/servicesquotes/entities/servicesquotes.entity';

import { CategoriesController } from 'src/categories/controllers/categories.controller';
import { CategoriesService } from 'src/categories/services/categories.service';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  providers: [SeedsService, CategoriesService, ServicesquotesService],
  controllers: [ServicesquotesController, CategoriesController],
  imports: [TypeOrmModule.forFeature([ServicesQuotes, Category])],
})
export class SeedsModule {}
