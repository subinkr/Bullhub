import { PickType } from '@nestjs/mapped-types';
import { ChatModel } from '../entities/chat.entity';
import { IsNumber } from 'class-validator';

export class ChatDto extends PickType(ChatModel, ['roomId', 'message']) {
  @IsNumber()
  userId: number;
}
