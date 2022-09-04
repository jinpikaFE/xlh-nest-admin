import { Test, TestingModule } from '@nestjs/testing';
import { AttrKeyService } from './attr-key.service';

describe('AttrKeyService', () => {
  let service: AttrKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttrKeyService],
    }).compile();

    service = module.get<AttrKeyService>(AttrKeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
