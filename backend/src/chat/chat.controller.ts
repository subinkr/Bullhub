import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { TokenGuard } from 'src/boards/guard/token.guard';
import { User } from 'src/boards/decorator/user.decorator';
import { UserModel } from 'src/users/entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  @ApiOperation({ summary: 'Get users room' })
  @UseGuards(TokenGuard)
  getRooms(@User() user: UserModel) {
    return this.chatService.getRooms(user);
  }

  @Get(':roomId')
  @ApiOperation({ summary: 'Get room info with chat' })
  @UseGuards(TokenGuard)
  getRoom(
    @Param('roomId', ParseIntPipe) roomId: number,
    @User() user: UserModel,
  ) {
    return this.chatService.getRoom(roomId, user);
  }

  ///////////////////////////////////////////////////
  // @Get(':roomId/:chatId')
  // @UseGuards(TokenGuard)
  // getChat(
  //   @Param('roomId', ParseIntPipe) roomId: number,
  //   @Param('chatId', ParseIntPipe) chatId: number,
  //   @User() user: UserModel,
  // ) {}
}
