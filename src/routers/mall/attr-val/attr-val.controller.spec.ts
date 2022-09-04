import { Test, TestingModule } from '@nestjs/testing';
import { AttrValController } from './attr-val.controller';
import { AttrValService } from './attr-val.service';

describe('AttrValController', () => {
  let controller: AttrValController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttrValController],
      providers: [AttrValService],
    }).compile();

    controller = module.get<AttrValController>(AttrValController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
