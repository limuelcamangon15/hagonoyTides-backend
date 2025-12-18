import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatsModule } from './chats/chats.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsController } from './chats/chats.controller';
import { ChatsService } from './chats/chats.service';
import 'dotenv/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI!),
    ChatsModule,
  ],
  controllers: [AppController, ChatsController],
  providers: [AppService, ChatsService],
})
export class AppModule {}
