import { UsersService } from 'src/users/users.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/boards/guard/token.guard';
import { User } from 'src/boards/decorator/user.decorator';
import { UserModel } from 'src/users/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  postLogin(@Body() loginDto: LoginDto) {
    return this.authService.postLogin(loginDto);
  }

  @Get('login')
  @ApiOperation({ summary: 'Get login page' })
  getLogin() {
    return this.authService.getLogin();
  }

  @Post('signup')
  @ApiOperation({ summary: 'User signup' })
  async postSignup(@Body() signupDto: SignupDto) {
    await this.userService.createUserImage(signupDto);
    return this.authService.postSignup(signupDto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'User logout' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  postLogout(@User() user: UserModel) {
    return this.authService.postLogout();
  }
}
