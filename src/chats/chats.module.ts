import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { ChatsGateway } from './chats.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [ChatsGateway, ChatsService],
  controllers: [ChatsController],
  exports: [ChatsService],
})
export class ChatsModule {}
