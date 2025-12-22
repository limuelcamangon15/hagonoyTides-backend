import { Module } from '@nestjs/common';
import { ChatsModule } from './chats/chats.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherModule } from './weather/weather.module';
import 'dotenv/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI!),
    ChatsModule,
    WeatherModule,
  ],
})
export class AppModule {}
