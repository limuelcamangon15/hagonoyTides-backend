import { Controller, Get } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get('messages')
  getMessages() {
    return this.chatsService.getMessages();
  }
}
