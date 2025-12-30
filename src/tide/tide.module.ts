import { Module } from '@nestjs/common';
import { TideService } from './tide.service';
import { TideController } from './tide.controller';

@Module({
  providers: [TideService],
  controllers: [TideController]
})
export class TideModule {}
