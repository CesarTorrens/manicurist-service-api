import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { QuotesService } from '../services/quotes.service';
import { CreateQuoteDto, UpdateQuoteDto } from '../dtos/quote.dto';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  findAll() {
    return this.quotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quotesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateQuoteDto) {
    return this.quotesService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateQuoteDto) {
    return this.quotesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quotesService.remove(id);
  }
}
