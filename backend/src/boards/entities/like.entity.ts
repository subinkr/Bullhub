import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '../../common/entities/base.entity';
import { UserModel } from 'src/users/entities/user.entity';
import { BoardModel } from 'src/boards/entities/board.entity';

@Entity()
export class LikeModel extends BaseModel {
  @ManyToOne(() => UserModel, (user) => user.likes, {
    onDelete: 'CASCADE',
  })
  user: UserModel;

  @ManyToOne(() => BoardModel, (board) => board.likes, {
    onDelete: 'CASCADE',
  })
  board: BoardModel;
}
