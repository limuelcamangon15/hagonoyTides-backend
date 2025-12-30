import { Test, TestingModule } from '@nestjs/testing';
import { TideService } from './tide.service';

describe('TideService', () => {
  let service: TideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TideService],
    }).compile();

    service = module.get<TideService>(TideService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
