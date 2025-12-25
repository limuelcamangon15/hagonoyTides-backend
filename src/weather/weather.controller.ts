import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  getWeather(@Query('city') city: string) {
    return this.weatherService.getWeatherByCity(city);
  }
}
