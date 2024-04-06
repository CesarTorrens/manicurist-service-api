import { Test, TestingModule } from '@nestjs/testing';
import { ServicesquotesService } from './servicesquotes.service';

describe('ServicesquotesService', () => {
  let service: ServicesquotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicesquotesService],
    }).compile();

    service = module.get<ServicesquotesService>(ServicesquotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
