import { Test, TestingModule } from '@nestjs/testing';
import { TideController } from './tide.controller';

describe('TideController', () => {
  let controller: TideController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TideController],
    }).compile();

    controller = module.get<TideController>(TideController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
