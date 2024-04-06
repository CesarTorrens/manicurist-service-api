import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { ServicesquotesService } from '../services/servicesquotes.service';
import {
  CreateServiceQuoteDto,
  UpdateServiceQuoteDto,
} from '../dtos/servicequote.dto';

@Controller('servicesquotes')
export class ServicesquotesController {
  constructor(private readonly servicesQuotesService: ServicesquotesService) {}

  @Get()
  findAll() {
    return this.servicesQuotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesQuotesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateServiceQuoteDto) {
    return this.servicesQuotesService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateServiceQuoteDto) {
    return this.servicesQuotesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesQuotesService.remove(id);
  }
}
