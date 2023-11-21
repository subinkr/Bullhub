import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/boards/const/category.const';
import { Roles } from 'src/users/const/role.const';
import { UserModel } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}
  getAdmin(user: UserModel) {
    if (user.role !== Roles.ADMIN) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    return this.userRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  deleteAdmin(memberId: number) {
    return this.userRepository.delete(memberId);
  }
}
