import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WeatherApiClient {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async fetchWeather(city: string) {
    //nestjs's way to call external api (like fetch or axios)
    const response = await lastValueFrom(
      this.httpService.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: city,
          appid: this.configService.get<string>('OPENWEATHERMAP_API_KEY'),
          units: 'metric',
        },
      }),
    );

    return response.data;
  }
}
