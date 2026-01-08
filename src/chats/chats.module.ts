import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { ChatsGateway } from './chats.gateway';
import { ChatLocationApiClient } from './clients/chat-location-api.client';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [ChatsGateway, ChatsService, ChatLocationApiClient],
  controllers: [ChatsController],
  exports: [ChatsService],
})
export class ChatsModule {}
