import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { UserModel } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  TEMP_FOLDER_PATH,
  USER_IMAGE_PATH,
  USER_PUBLIC_IMAGE_PATH,
} from 'src/common/const/path.const';
import { basename, join } from 'path';
import { promises } from 'fs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async createUserImage(userDto: UserDto) {
    if (!userDto.image) {
      return true;
    }
    if (userDto.image.split('/')[1] === 'public') {
      return true;
    }

    const tempFilePath = join(TEMP_FOLDER_PATH, basename(userDto.image));

    try {
      await promises.access(tempFilePath);
    } catch (e) {
      throw new BadRequestException('존재하지 않는 파일입니다.');
    }

    const filename = basename(tempFilePath);
    const newPath = join(USER_IMAGE_PATH, filename);
    await promises.rename(tempFilePath, newPath);

    return true;
  }

  getUsers(userId: number) {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  async putUsers(userId: number, authUserId: number, userDto: UserDto) {
    if (userId !== authUserId) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    let { nickname, image } = userDto;

    if (image && image.split('/')[1] !== 'public') {
      image = `/${join(USER_PUBLIC_IMAGE_PATH, image)}`;
    }

    return this.userRepository.update(userId, {
      nickname,
      image,
    });
  }

  async deleteUsers(userId: number, authUserId: number) {
    if (userId !== authUserId) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    return this.userRepository.delete(userId);
  }
}
