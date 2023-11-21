import { IsNotEmpty, IsString } from 'class-validator';
import { BaseModel } from 'src/common/entities/base.entity';
import { UserModel } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { RoomModel } from './room.entity';

@Entity()
export class ChatModel extends BaseModel {
  @ManyToOne(() => RoomModel, (room) => room.users, {
    onDelete: 'CASCADE',
  })
  roomId: number;

  @ManyToOne(() => UserModel, (user) => user.chats, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: UserModel;

  @Column()
  @IsString()
  @IsNotEmpty()
  message: string;
}
