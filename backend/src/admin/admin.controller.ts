import {
  Controller,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { TokenGuard } from 'src/boards/guard/token.guard';
import { User } from 'src/boards/decorator/user.decorator';
import { UserModel } from 'src/users/entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user list' })
  @UseGuards(TokenGuard)
  getAdmin(@User() user: UserModel) {
    return this.adminService.getAdmin(user);
  }

  @Delete(':memberId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user' })
  deleteAdmin(@Param('memberId', ParseIntPipe) memberId: number) {
    return this.adminService.deleteAdmin(memberId);
  }
}
