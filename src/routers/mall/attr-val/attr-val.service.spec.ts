import { Test, TestingModule } from '@nestjs/testing';
import { AttrValService } from './attr-val.service';

describe('AttrValService', () => {
  let service: AttrValService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttrValService],
    }).compile();

    service = module.get<AttrValService>(AttrValService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
