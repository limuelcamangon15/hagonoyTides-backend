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
    const MANILABAY_LAT = 14.5188;
    const MANILABAY_LON = 120.758;

    const response = await lastValueFrom(
      this.httpService.get('https://www.worldtides.info/api/v3', {
        params: {
          lat: MANILABAY_LAT,
          lon: MANILABAY_LON,
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
