import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardDto } from './dto/board.dto';
import { CommentDto } from './dto/comment.dto';
import { Categories } from './const/category.const';
import { TokenGuard } from './guard/token.guard';
import { User } from './decorator/user.decorator';
import { UserModel } from 'src/users/entities/user.entity';
import { UserInterceptor } from 'src/common/interceptors/user.interceptor';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BoardModel } from './entities/board.entity';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  @ApiOperation({ summary: 'Get write board page' })
  @UseGuards(TokenGuard)
  @UseInterceptors(UserInterceptor)
  getBoards() {
    return this.boardsService.getBoards();
  }

  @Post()
  @ApiOperation({ summary: 'Write board' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  async postBoards(@Body() boardDto: BoardDto, @User() user: UserModel) {
    await this.boardsService.createBoardImage(boardDto);
    return this.boardsService.postBoards(boardDto, user);
  }

  @Get('board_id/:boardId')
  @ApiOperation({ summary: 'Get board' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @UseInterceptors(UserInterceptor)
  getBoardsBid(
    @Param('boardId', ParseIntPipe) boardId: number,
    @User('id') userId: number,
  ) {
    return this.boardsService.getBoardsBid(boardId, userId);
  }

  @Get('board_id/:boardId/user_id/:userId')
  @ApiOperation({ summary: 'Get modify board page' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @UseInterceptors(UserInterceptor)
  getBoardsBidUid(
    @Param('boardId', ParseIntPipe) boardId: number,
    @User('id') userId: number,
  ) {
    return this.boardsService.getBoardsBidUid(boardId, userId);
  }

  @Put('board_id/:boardId')
  @ApiOperation({ summary: 'Modify board' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  async putBoardsBid(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() boardDto: BoardDto,
    @User('id') userId: number,
  ) {
    await this.boardsService.createBoardImage(boardDto);
    return this.boardsService.putBoardsBid(boardId, userId, boardDto);
  }

  @Delete('board_id/:boardId')
  @ApiOperation({ summary: 'Delete board' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  deleteBoardsBid(
    @Param('boardId', ParseIntPipe) boardId: number,
    @User('id') userId: number,
  ) {
    return this.boardsService.deleteBoardsBid(boardId, userId);
  }

  @Post('board_id/:boardId/user_id/:userId')
  @ApiOperation({ summary: 'Like board' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  postBoardsBidUid(
    @Param('boardId', ParseIntPipe) boardId: number,
    @User('id') userId: number,
  ) {
    return this.boardsService.postBoardsBidUid(boardId, userId);
  }

  @Delete('board_id/:boardId/user_id/:userId')
  @ApiOperation({ summary: 'Dislike board' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  deleteBoardsBidUid(
    @Param('boardId', ParseIntPipe) boardId: number,
    @User('id') userId: number,
  ) {
    return this.boardsService.deleteBoardsBidUid(boardId, userId);
  }

  @Post('board_id/:boardId')
  @ApiOperation({ summary: 'Write comment' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  postBoardsBid(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() commentDto: CommentDto,
    @User() user: UserModel,
  ) {
    return this.boardsService.postBoardsBid(boardId, user, commentDto);
  }

  @Put('board_id/:boardId/comment_id/:commentId')
  @ApiOperation({ summary: 'Modify comment' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  putBoardsBidCid(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() commentDto: CommentDto,
    @User() user: UserModel,
  ) {
    return this.boardsService.putBoardsBidCid(
      boardId,
      commentId,
      user,
      commentDto,
    );
  }

  @Delete('board_id/:boardId/comment_id/:commentId')
  @ApiOperation({ summary: 'Delete comment' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  deleteBoardsBidCid(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @User() user: UserModel,
  ) {
    return this.boardsService.deleteBoardsBidCid(boardId, user, commentId);
  }

  @Get(':category/:page')
  @ApiOperation({ summary: 'Get board list' })
  @UseGuards(TokenGuard)
  @UseInterceptors(UserInterceptor)
  getBoardsCategory(
    @Param('category') category: Categories,
    @Param('page', ParseIntPipe) page: number,
    @Query('keyword') keyword: string,
  ) {
    return this.boardsService.getBoardsCategory(category, page, keyword);
  }
}
