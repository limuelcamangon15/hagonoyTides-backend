import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TideApiClient {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async fetchTide(startDate: string) {
    const HAGONOY_LAT = 14.5188;
    const HAGONOY_LON = 120.758;
    const HIGHTIDE_OFFSET = 0.51;
    const LOWTIDE_OFFSET = 0.52;

    const response = await lastValueFrom(
      this.httpService.get('https://www.worldtides.info/api/v3', {
        params: {
          lat: HAGONOY_LAT,
          lon: HAGONOY_LON,
          date: startDate,
          days: 7,
          extremes: true,
          key: this.configService.get<string>('WORLDTIDES_API_KEY'),
        },
      }),
    );

    return response.data;
  }
}
