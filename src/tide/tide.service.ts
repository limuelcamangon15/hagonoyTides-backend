import { Injectable } from '@nestjs/common';
import { TideApiClient } from './clients/tide-api.client';

@Injectable()
export class TideService {
  constructor(private readonly tideApiClient: TideApiClient) {}

  async getSevenDaysTides(startDate: string): Promise<any> {
    const HIGHTIDE_OFFSET = 0.51;
    const LOWTIDE_OFFSET = 0.52;

    return this.tideApiClient.fetchTide(startDate);
  }
}
