import {
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserInterceptor } from './common/interceptors/user.interceptor';
import { TokenGuard } from './boards/guard/token.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from './boards/decorator/user.decorator';
import { UserModel } from './users/entities/user.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('/')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get main board list' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @UseInterceptors(UserInterceptor)
  getPosts() {
    return this.appService.getPosts();
  }

  @Post('image')
  @ApiOperation({ summary: 'Upload image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(TokenGuard)
  postImage(@UploadedFile() file: Express.Multer.File) {
    return { filename: file.filename };
  }
}
