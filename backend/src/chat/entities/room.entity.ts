import { BaseModel } from 'src/common/entities/base.entity';
import { UserModel } from 'src/users/entities/user.entity';
import { Entity, ManyToMany, OneToMany } from 'typeorm';
import { ChatModel } from './chat.entity';

@Entity()
export class RoomModel extends BaseModel {
  @ManyToMany(() => UserModel, (user) => user.rooms, {
    onDelete: 'CASCADE',
  })
  users: UserModel[];

  @OneToMany(() => ChatModel, (chat) => chat.roomId, { eager: true })
  chats: ChatModel[];
}
