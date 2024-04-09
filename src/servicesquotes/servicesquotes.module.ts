import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServicesquotesController } from './controllers/servicesquotes.controller';
import { ServicesquotesService } from './services/servicesquotes.service';
import { ServicesQuotes } from './entities/servicesquotes.entity';

import { CategoriesController } from 'src/categories/controllers/categories.controller';
import { CategoriesService } from 'src/categories/services/categories.service';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServicesQuotes, Category])],
  providers: [ServicesquotesService, CategoriesService],
  controllers: [ServicesquotesController, CategoriesController],
  exports: [ServicesquotesService],
})
export class ServicesquotesModule {}
