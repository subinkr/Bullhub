import { ChatModel } from 'src/chat/entities/chat.entity';
import { chatGateway } from './chat.gateway';
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModel } from './entities/room.entity';
import { UserModel } from 'src/users/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([ChatModel, RoomModel, UserModel])],
  controllers: [ChatController],
  providers: [chatGateway, ChatService, AuthService, UsersService, JwtService],
})
export class ChatModule {}
