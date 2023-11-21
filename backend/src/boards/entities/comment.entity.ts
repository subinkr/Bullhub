import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '../../common/entities/base.entity';
import { UserModel } from 'src/users/entities/user.entity';
import { BoardModel } from 'src/boards/entities/board.entity';
import { IsString } from 'class-validator';

@Entity()
export class CommentModel extends BaseModel {
  @ManyToOne(() => UserModel, (user) => user.comments, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: UserModel;

  @ManyToOne(() => BoardModel, (board) => board.comments, {
    onDelete: 'CASCADE',
  })
  board: BoardModel;

  @Column()
  @IsString()
  content: string;
}
