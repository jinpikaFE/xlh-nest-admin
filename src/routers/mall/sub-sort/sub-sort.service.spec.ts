import { Test, TestingModule } from '@nestjs/testing';
import { SubSortService } from './sub-sort.service';

describe('SubSortService', () => {
  let service: SubSortService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubSortService],
    }).compile();

    service = module.get<SubSortService>(SubSortService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
