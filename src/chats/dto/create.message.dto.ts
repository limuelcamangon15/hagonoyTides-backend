import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  senderLocation: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
