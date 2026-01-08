import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ChatLocationApiClient {
  constructor(private readonly httpService: HttpService) {}

  async decodeCoordinates(lat: string, lon: string) {
    const response = await lastValueFrom(
      this.httpService.get(`https://photon.komoot.io/reverse?`, {
        params: {
          lat: lat,
          lon: lon,
        },
      }),
    );

    return response.data;
  }
}
