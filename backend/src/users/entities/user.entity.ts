import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BoardModel } from 'src/boards/entities/board.entity';
import { ChatModel } from 'src/chat/entities/chat.entity';
import { Roles } from 'src/users/const/role.const';
import { BaseModel } from 'src/common/entities/base.entity';
import { CommentModel } from 'src/boards/entities/comment.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { LikeModel } from 'src/boards/entities/like.entity';
import { ViewModel } from 'src/boards/entities/view.entity';
import { RoomModel } from 'src/chat/entities/room.entity';

@Entity()
export class UserModel extends BaseModel {
  @Column()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    default: '홍길동',
  })
  @IsString()
  @IsOptional()
  nickname: string;

  @Column({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @Column({
    enum: Object.values(Roles),
    default: Roles.USER,
  })
  role: Roles;

  @OneToMany(() => BoardModel, (board) => board.user, {})
  boards: BoardModel[];

  @OneToMany(() => LikeModel, (like) => like.user, {})
  likes: LikeModel[];

  @OneToMany(() => ViewModel, (view) => view.user, {})
  views: ViewModel[];

  @OneToMany(() => CommentModel, (comment) => comment.user, {})
  comments: CommentModel[];

  @ManyToMany(() => RoomModel, (room) => room.users, {})
  @JoinTable()
  rooms: RoomModel[];

  @OneToMany(() => ChatModel, (chat) => chat.user, {})
  chats: ChatModel[];
}
