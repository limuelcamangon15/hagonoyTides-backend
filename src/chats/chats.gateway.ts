import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatsService } from './chats.service';
import { CreateMessageDto } from './dto/create.message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatsService: ChatsService) {}

  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() data: CreateMessageDto | string) {
    const payload: CreateMessageDto =
      typeof data === 'string' ? JSON.parse(data) : data;
    const savedMessage = await this.chatsService.createMessage(payload);

    this.server.emit('receivedMessage', savedMessage);
  }
}
