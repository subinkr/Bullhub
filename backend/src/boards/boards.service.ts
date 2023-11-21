import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BoardDto } from './dto/board.dto';
import { CommentDto } from './dto/comment.dto';
import { Categories } from './const/category.const';
import { ILike, Repository } from 'typeorm';
import { BoardModel } from './entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/users/entities/user.entity';
import { CommentModel } from './entities/comment.entity';
import { LikeModel } from './entities/like.entity';
import { ViewModel } from './entities/view.entity';
import {
  BOARD_IMAGE_PATH,
  BOARD_PUBLIC_IMAGE_PATH,
  TEMP_FOLDER_PATH,
} from 'src/common/const/path.const';
import { basename, join } from 'path';
import { promises } from 'fs';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardModel)
    private readonly boardRepository: Repository<BoardModel>,
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(CommentModel)
    private readonly commentRepository: Repository<CommentModel>,
    @InjectRepository(LikeModel)
    private readonly likeRepository: Repository<LikeModel>,
    @InjectRepository(ViewModel)
    private readonly viewRepository: Repository<ViewModel>,
  ) {}

  async createBoardImage(boardDto: BoardDto) {
    if (!boardDto.image) {
      return true;
    }

    if (boardDto.image.split('/')[1] === 'public') {
      return true;
    }

    const tempFilePath = join(TEMP_FOLDER_PATH, basename(boardDto.image));

    try {
      await promises.access(tempFilePath);
    } catch (e) {
      throw new BadRequestException('존재하지 않는 파일입니다.');
    }

    const filename = basename(tempFilePath);
    const newPath = join(BOARD_IMAGE_PATH, filename);
    await promises.rename(tempFilePath, newPath);

    return true;
  }

  getBoards() {
    return { description: 'This action returns write page' };
  }

  postBoards(boardDto: BoardDto, user: UserModel) {
    let { image } = boardDto;
    if (image) {
      image = `/${join(BOARD_PUBLIC_IMAGE_PATH, image)}`;
    }
    return this.boardRepository.save({ ...boardDto, image, user });
  }

  async getBoardsBid(boardId: number, userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const board = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
      order: {
        id: 'ASC',
        comments: {
          id: 'DESC',
        },
      },
    });

    const view = await this.viewRepository.exist({
      where: {
        user: {
          id: userId,
        },
        board: {
          id: boardId,
        },
      },
    });

    if (!view) {
      await this.viewRepository.save({ user, board });
      await this.boardRepository.increment({ id: board.id }, 'viewsCount', 1);
    }

    const isGood = await this.likeRepository.exist({
      where: {
        user: {
          id: userId,
        },
        board: {
          id: boardId,
        },
      },
    });

    return {
      ...board,
      isGood,
    };
  }

  async getBoardsBidUid(boardId: number, userId: number) {
    const board = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
    });

    if (!board) {
      throw new BadRequestException('존재하지 않는 글입니다.');
    }

    if (board.user.id !== userId) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    return this.boardRepository.findOne({
      where: {
        id: boardId,
      },
    });
  }

  async putBoardsBid(boardId: number, userId: number, boardDto: BoardDto) {
    const board = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
    });

    if (!board) {
      throw new BadRequestException('존재하지 않는 글입니다.');
    }

    if (board.user.id !== userId) {
      throw new BadRequestException('권한이 없습니다.');
    }

    let { image } = boardDto;

    if (image && image.split('/')[1] !== 'public') {
      image = `/${join(BOARD_PUBLIC_IMAGE_PATH, image)}`;
    }

    return await this.boardRepository.update(boardId, {
      ...boardDto,
      image,
    });
  }

  async deleteBoardsBid(boardId: number, userId: number) {
    const board = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
    });

    if (!board) {
      throw new BadRequestException('존재하지 않는 글입니다.');
    }

    if (board.user.id !== userId) {
      throw new BadRequestException('권한이 없습니다.');
    }

    return this.boardRepository.delete(boardId);
  }

  async postBoardsBidUid(boardId: number, userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const board = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
    });

    const like = await this.likeRepository.exist({
      where: {
        board: {
          id: boardId,
        },
        user: {
          id: userId,
        },
      },
    });

    if (like) {
      throw new BadRequestException('이미 추천하셨습니다.');
    }

    await this.boardRepository.increment({ id: boardId }, 'likesCount', 1);
    return this.likeRepository.save({ user, board });
  }

  async deleteBoardsBidUid(boardId: number, userId: number) {
    const like = await this.likeRepository.findOne({
      where: {
        board: {
          id: boardId,
        },
        user: {
          id: userId,
        },
      },
    });

    if (!like) {
      throw new BadRequestException('이미 추천을 취소했습니다.');
    }

    await this.boardRepository.decrement({ id: boardId }, 'likesCount', 1);
    return this.likeRepository.delete(like.id);
  }

  async postBoardsBid(
    boardId: number,
    user: UserModel,
    commentDto: CommentDto,
  ) {
    const { content } = commentDto;
    const board = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
    });
    await this.boardRepository.increment({ id: boardId }, 'commentsCount', 1);
    return this.commentRepository.save({
      board,
      user,
      content,
    });
  }

  async putBoardsBidCid(
    boardId: number,
    commentId: number,
    user: UserModel,
    commentDto: CommentDto,
  ) {
    const board = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
    });

    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new BadRequestException('존재하지 않는 댓글입니다.');
    }

    if (comment.user.id !== user.id) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    const { content } = commentDto;

    return this.commentRepository.update(commentId, {
      board,
      user,
      content,
    });
  }

  async deleteBoardsBidCid(
    boardId: number,
    user: UserModel,
    commentId: number,
  ) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new BadRequestException('존재하지 않는 댓글입니다.');
    }

    if (comment.user.id !== user.id) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    await this.boardRepository.decrement({ id: boardId }, 'commentsCount', 1);
    return this.commentRepository.delete(commentId);
  }

  async getBoardsCategory(category: Categories, page: number, keyword: string) {
    let list;

    if (keyword) {
      list = await this.boardRepository.findAndCount({
        where: {
          category,
          title: ILike(`%${keyword}%`),
        },
        order: {
          id: 'DESC',
        },
        skip: (page - 1) * 10,
        take: 10,
      });
    } else {
      list = await this.boardRepository.findAndCount({
        where: {
          category,
        },
        order: {
          id: 'DESC',
        },
        skip: (page - 1) * 10,
        take: 10,
      });
    }

    const listCount = list[1];
    const pages = parseInt(`${(listCount - 1) / 10}`) + 1;
    const returnPages = [];

    if (page < 3) {
      for (let i = 1; i <= 5; i++) {
        if (pages < i) {
          break;
        }
        returnPages.push(i);
      }
    } else if (page > pages - 2) {
      for (let i = pages - 4; i <= pages; i++) {
        if (i < 1) {
          continue;
        }
        returnPages.push(i);
      }
    } else {
      for (let i = page - 2; i <= page + 2; i++) {
        returnPages.push(i);
      }
    }

    return {
      list,
      currentPage: page,
      pages: returnPages,
    };
  }
}
