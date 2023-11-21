import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([UserModel])],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
