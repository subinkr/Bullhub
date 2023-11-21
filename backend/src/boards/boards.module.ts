import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { UserModel } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModel } from './entities/board.entity';
import { CommentModel } from './entities/comment.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LikeModel } from './entities/like.entity';
import { ViewModel } from './entities/view.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserModel,
      BoardModel,
      CommentModel,
      LikeModel,
      ViewModel,
    ]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService, AuthService, JwtService, UsersService],
})
export class BoardsModule {}
