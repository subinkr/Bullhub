import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { TokenGuard } from 'src/boards/guard/token.guard';
import { User } from 'src/boards/decorator/user.decorator';
import { UserInterceptor } from 'src/common/interceptors/user.interceptor';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Get user' })
  @UseGuards(TokenGuard)
  @UseInterceptors(UserInterceptor)
  getUsers(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.getUsers(userId);
  }

  @Put(':userId')
  @ApiOperation({ summary: 'Modify user' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  async putUsers(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() userDto: UserDto,
    @User('id') authUserId: number,
  ) {
    await this.usersService.createUserImage(userDto);
    return this.usersService.putUsers(userId, authUserId, userDto);
  }
  //
  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  deleteUsers(
    @Param('userId', ParseIntPipe) userId: number,
    @User('id') authUserId: number,
  ) {
    return this.usersService.deleteUsers(userId, authUserId);
  }
}
