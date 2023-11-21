import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserModel } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { join } from 'path';
import { USER_PUBLIC_IMAGE_PATH } from 'src/common/const/path.const';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private readonly jwtService: JwtService,
  ) {}
  async postLogin(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        username: loginDto.username,
      },
    });
    if (!user) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }

    const compPass = await bcrypt.compare(loginDto.password, user.password);
    if (!compPass) {
      throw new UnauthorizedException('비밀번호가 다릅니다.');
    }

    return this.signToken(user, 3600);
  }

  async getLogin() {
    return `This action returns login page`;
  }

  async postSignup(signupDto: SignupDto) {
    const user = await this.userRepository.findOne({
      where: {
        username: signupDto.username,
      },
    });
    if (user) {
      throw new BadRequestException('이미 존재하는 아이디입니다.');
    }

    const hash = await bcrypt.hash(
      signupDto.password,
      parseInt(process.env.HASH_ROUNDS),
    );

    let { image } = signupDto;

    if (image) {
      image = `/${join(USER_PUBLIC_IMAGE_PATH, image)}`;
    }

    const newUser = await this.userRepository.save({
      ...signupDto,
      password: hash,
      image,
    });
    return this.signToken(newUser, 3600);
  }

  async postLogout() {
    return this.signToken(null, 0);
  }

  tokenFormatter(header: string) {
    const splitToken = header.split(' ');
    if (splitToken.length !== 2) {
      throw new UnauthorizedException('잘못된 토큰입니다.');
    }
    const token = splitToken[1];
    this.verifyToken(token);
    return token;
  }

  signToken(
    user: Pick<UserModel, 'username' | 'nickname' | 'image'>,
    expiresIn: number,
  ) {
    const payload = {
      ...user,
    };

    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn,
      }),
    };
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException('잘못된 토큰입니다.');
    }
  }
}
