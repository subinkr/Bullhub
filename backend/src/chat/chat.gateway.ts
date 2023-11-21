import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
import { RoomDto } from './dto/room.dto';

@WebSocketGateway({
  namespace: 'chat',
})
export class chatGateway implements OnGatewayConnection {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    console.log(`on connect called : ${socket.id}`);
  }

  @SubscribeMessage('create_room')
  async createRoom(
    @MessageBody() roomDto: RoomDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const chat = await this.chatService.createRoom(roomDto.ids);
  }

  @SubscribeMessage('enter_room')
  async enterRoom(
    @MessageBody() roomDto: RoomDto,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(typeof roomDto.ids);
    for (const roomId of roomDto.ids) {
      const exist = await this.chatService.checkIfRoomExist(roomId);

      if (!exist) {
        throw new WsException({
          message: `존재하지 않는 room입니다. roomId: ${roomId}`,
        });
      }
    }
    socket.join(roomDto.ids.map((x) => x.toString()));
  }

  @SubscribeMessage('send_message')
  async sendMessage(
    @MessageBody() chatDto: ChatDto,
    @ConnectedSocket() socket: Socket,
  ) {
    // this.server.in(message.chatId).emit('receive_message', message.message);
    const roomExist = await this.chatService.checkIfRoomExist(chatDto.roomId);
    if (!roomExist) {
      throw new WsException(
        `존재하지 않는 room입니다. Room ID: ${chatDto.roomId}`,
      );
    }

    const chat = await this.chatService.postChat(chatDto);

    socket.to(chat.roomId.toString()).emit('receive_message', chatDto.message);
  }
}
