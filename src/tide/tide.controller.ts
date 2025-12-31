import { Controller, Get, Query } from '@nestjs/common';
import { TideService } from './tide.service';

@Controller('tide')
export class TideController {
  constructor(private readonly tideService: TideService) {}

  @Get()
  getSevenDaysTides(@Query('startDate') startDate: string) {
    return this.tideService.fetchAndStoreSevenDays(startDate);
  }
}
