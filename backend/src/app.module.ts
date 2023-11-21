import {
  BadRequestException,
  ClassSerializerInterceptor,
  Module,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { ChatModule } from './chat/chat.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModel } from './users/entities/user.entity';
import { BoardModel } from './boards/entities/board.entity';
import { ChatModel } from './chat/entities/chat.entity';
import { CommentModel } from './boards/entities/comment.entity';
import { LikeModel } from './boards/entities/like.entity';
import { ViewModel } from './boards/entities/view.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import {
  PUBLIC_FOLDER_PATH,
  TEMP_FOLDER_PATH,
} from './common/const/path.const';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import * as multer from 'multer';
import { v4 as uuid } from 'uuid';
import { RoomModel } from './chat/entities/room.entity';
import { ChatService } from './chat/chat.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'postgres',
      entities: [
        UserModel,
        BoardModel,
        ChatModel,
        RoomModel,
        CommentModel,
        LikeModel,
        ViewModel,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([BoardModel, UserModel]),
    ServeStaticModule.forRoot({
      rootPath: PUBLIC_FOLDER_PATH,
      serveRoot: '/public',
    }),
    MulterModule.register({
      limits: {
        fileSize: 10000000,
      },
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);

        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
          return cb(
            new BadRequestException('jpg/jpeg/png 파일만 업로드 가능합니다.'),
            false,
          );
        }

        return cb(null, true);
      },

      storage: multer.diskStorage({
        destination: function (req, res, cb) {
          cb(null, TEMP_FOLDER_PATH);
        },
        filename: function (req, file, cb) {
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }),
    AuthModule,
    UsersModule,
    BoardsModule,
    ChatModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    UsersService,
    JwtService,
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
