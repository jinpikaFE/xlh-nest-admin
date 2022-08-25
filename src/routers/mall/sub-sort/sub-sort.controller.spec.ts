import { Test, TestingModule } from '@nestjs/testing';
import { SubSortController } from './sub-sort.controller';
import { SubSortService } from './sub-sort.service';

describe('SubSortController', () => {
  let controller: SubSortController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubSortController],
      providers: [SubSortService],
    }).compile();

    controller = module.get<SubSortController>(SubSortController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
