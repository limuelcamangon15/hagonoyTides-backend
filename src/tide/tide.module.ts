import { Module } from '@nestjs/common';
import { TideService } from './tide.service';
import { TideController } from './tide.controller';
import { TideApiClient } from './clients/tide-api.client';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Tide, TideSchema } from './schemas/tide.schema';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule,
    MongooseModule.forFeature([{ name: Tide.name, schema: TideSchema }]),
  ],
  providers: [TideService, TideApiClient],
  controllers: [TideController],
})
export class TideModule {}
