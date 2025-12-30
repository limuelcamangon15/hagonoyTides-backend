import { Module } from '@nestjs/common';
import { TideService } from './tide.service';
import { TideController } from './tide.controller';
import { TideApiClient } from './clients/tide-api.client';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule,
  ],
  providers: [TideService, TideApiClient],
  controllers: [TideController],
})
export class TideModule {}
