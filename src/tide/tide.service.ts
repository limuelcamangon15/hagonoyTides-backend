import { Injectable } from '@nestjs/common';
import { TideApiClient } from './clients/tide-api.client';

@Injectable()
export class TideService {
  constructor(private readonly tideApiClient: TideApiClient) {}

  async getSevenDaysTides(startDate: string): Promise<any> {
    return this.tideApiClient.fetchTide(startDate);
  }
}
