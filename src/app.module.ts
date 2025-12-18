import { Module } from '@nestjs/common';
import { ChatsModule } from './chats/chats.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI!),
    ChatsModule,
  ],
})
export class AppModule {}
