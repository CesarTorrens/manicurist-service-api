import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuotesController } from './controllers/quotes.controller';
import { QuotesService } from './services/quotes.service';
import { Quote } from './entities/quote.entity';

import { ServicesquotesController } from 'src/servicesquotes/controllers/servicesquotes.controller';
import { ServicesquotesService } from 'src/servicesquotes/services/servicesquotes.service';
import { ServicesQuotes } from 'src/servicesquotes/entities/servicesquotes.entity';

import { CategoriesController } from 'src/categories/controllers/categories.controller';
import { CategoriesService } from 'src/categories/services/categories.service';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quote, ServicesQuotes, Category])],
  controllers: [
    QuotesController,
    ServicesquotesController,
    CategoriesController,
  ],
  providers: [QuotesService, ServicesquotesService, CategoriesService],
})
export class QuotesModule {}
