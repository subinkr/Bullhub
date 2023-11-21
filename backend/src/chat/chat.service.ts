import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomModel } from './entities/room.entity';
import { In, Repository } from 'typeorm';
import { UserModel } from 'src/users/entities/user.entity';
import { ChatModel } from './entities/chat.entity';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(RoomModel)
    private readonly roomRepository: Repository<RoomModel>,
    @InjectRepository(ChatModel)
    private readonly chatRepository: Repository<ChatModel>,
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async createRoom(userIds: number[]) {
    return this.roomRepository.save({
      users: userIds.map((id) => ({ id })),
    });
  }

  async getRooms(user: UserModel) {
    const findUserRooms = await this.roomRepository.find({
      where: {
        users: {
          id: user.id,
        },
      },
    });

    const userRooms = findUserRooms.map((room) => room.id);

    return this.roomRepository.find({
      where: {
        id: In(userRooms),
      },
      relations: {
        users: true,
      },
    });
  }

  async getRoom(roomId: number, user: UserModel) {
    const room = await this.roomRepository.findOne({
      where: {
        id: roomId,
      },
      relations: {
        users: true,
      },
    });

    if (!room) {
      throw new UnauthorizedException('잘못된 접근입니다.');
    }

    const userCheck = room.users.findIndex((member) => member.id === user.id);
    room.chats.sort((a, b) => b.id - a.id);

    if (userCheck === -1) {
      throw new UnauthorizedException('잘못된 접근입니다.');
    }

    return room;
  }

  async postChat(chatDto: ChatDto) {
    const { roomId, userId, message } = chatDto;
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    return this.chatRepository.save({
      roomId,
      message,
      user,
    });
  }

  checkIfRoomExist(roomId: number) {
    return this.roomRepository.exist({
      where: {
        id: roomId,
      },
    });
  }
}
