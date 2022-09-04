import { Test, TestingModule } from '@nestjs/testing';
import { AttrKeyController } from './attr-key.controller';
import { AttrKeyService } from './attr-key.service';

describe('AttrKeyController', () => {
  let controller: AttrKeyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttrKeyController],
      providers: [AttrKeyService],
    }).compile();

    controller = module.get<AttrKeyController>(AttrKeyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
