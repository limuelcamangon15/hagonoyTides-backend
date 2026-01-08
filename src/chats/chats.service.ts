import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schemas/message.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create.message.dto';
import { ChatLocationApiClient } from './clients/chat-location-api.client';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
    private readonly chatLocationApiClient: ChatLocationApiClient,
  ) {}

  async createMessage(dto: CreateMessageDto) {
    return await this.messageModel.create({
      senderLocation: dto.senderLocation,
      message: dto.message,
    });
  }

  async getMessages() {
    return await this.messageModel.find().sort({ createdAt: 1 });
  }

  async decodeCoordinates(lat: string, lon: string) {
    return await this.chatLocationApiClient.decodeCoordinates(lat, lon);
  }
}
