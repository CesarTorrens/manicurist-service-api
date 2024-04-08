import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateQuoteDto, UpdateQuoteDto } from '../dtos/quote.dto';
import { Quote } from '../entities/quote.entity';

import { ServicesquotesService } from 'src/servicesquotes/services/servicesquotes.service';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private readonly quotesRepository: Repository<Quote>,
    private readonly servicesQuotesService: ServicesquotesService,
  ) {}

  async findAll(): Promise<Quote[]> {
    return this.quotesRepository.find({ relations: ['service'] });
  }

  async findOne(id: string): Promise<Quote> {
    const quote = await this.quotesRepository.findOneOrFail({
      where: { id },
      relations: ['service'],
    });

    if (!quote) {
      throw new NotFoundException(`Quote #${id} not found`);
    }
    return quote;
  }

  async create(quote: CreateQuoteDto): Promise<Quote> {
    const date = new Date(quote.date);
    if (date < new Date()) {
      throw new BadRequestException('Date must be greater than today');
    }
    const existQuote = await this.quotesRepository.find({
      where: { date: quote.date },
    });

    if (existQuote.length) {
      throw new BadRequestException(`Quote ${quote.date} already exists`);
    }

    const newQuote = this.quotesRepository.create(quote);

    const service = await this.servicesQuotesService.findOne(quote.serviceId);
    newQuote.service = service;

    return await this.quotesRepository.save(newQuote);
  }

  async update(id: string, changes: UpdateQuoteDto): Promise<Quote | object> {
    const quote = await this.findOne(id);

    if (changes.serviceId) {
      const service = await this.servicesQuotesService.findOne(
        changes.serviceId,
      );
      quote.service = service;
    }

    this.quotesRepository.merge(quote, changes);
    await this.quotesRepository.update(id, quote);
    return await this.quotesRepository.save(quote);
  }

  async remove(id: string): Promise<object> {
    await this.findOne(id);
    await this.quotesRepository.delete(id);
    return { message: `Quote deleted successfully ${id}` };
  }
}
