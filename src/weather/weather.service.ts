import { Injectable } from '@nestjs/common';
import { WeatherApiClient } from './clients/weather-api.client';

@Injectable()
export class WeatherService {
  constructor(private readonly weatherApiClient: WeatherApiClient) {}

  async getWeatherByCity(city: string) {
    return this.weatherApiClient.fetchWeather(city);
  }
}
