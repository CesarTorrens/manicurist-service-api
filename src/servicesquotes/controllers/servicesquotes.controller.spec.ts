import { Test, TestingModule } from '@nestjs/testing';
import { ServicesquotesController } from './servicesquotes.controller';

describe('ServicesquotesController', () => {
  let controller: ServicesquotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesquotesController],
    }).compile();

    controller = module.get<ServicesquotesController>(ServicesquotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
