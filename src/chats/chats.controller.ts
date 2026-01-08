import { Controller, Get, Query } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get('messages')
  getMessages() {
    return this.chatsService.getMessages();
  }

  @Get('senderLocation')
  getDecodedCoordinatesLocation(
    @Query('lat') lat: string,
    @Query('lon') lon: string,
  ) {
    return this.chatsService.decodeCoordinates(lat, lon);
  }
}
