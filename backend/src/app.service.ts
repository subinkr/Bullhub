import { Injectable } from '@nestjs/common';
import { IsNull, Not, Repository } from 'typeorm';
import { BoardModel } from './boards/entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './boards/const/category.const';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(BoardModel)
    private readonly boardRepository: Repository<BoardModel>,
  ) {}

  async getPosts() {
    const mainPhotos = await this.boardRepository.find({
      where: {
        image: Not(IsNull()),
      },
      order: {
        likesCount: 'DESC',
      },
      take: 3,
    });

    const announcementLatests = await this.boardRepository.find({
      where: {
        category: Categories.ANNOUNCEMENT,
      },
      order: {
        id: 'DESC',
      },
      take: 5,
    });

    const domesticBoardLikes = await this.boardRepository.find({
      where: {
        category: Categories.DOMESTIC,
      },
      order: {
        likesCount: 'DESC',
      },
      take: 5,
    });

    const foreignBoardLikes = await this.boardRepository.find({
      where: {
        category: Categories.FOREIGN,
      },
      order: {
        likesCount: 'DESC',
      },
      take: 5,
    });

    const bitcoinBoardLikes = await this.boardRepository.find({
      where: {
        category: Categories.BITCOIN,
      },
      order: {
        likesCount: 'DESC',
      },
      take: 5,
    });

    const boardLikes = await this.boardRepository.find({
      order: {
        likesCount: 'DESC',
      },
      take: 10,
    });

    const boardComments = await this.boardRepository.find({
      order: {
        commentsCount: 'DESC',
      },
      take: 10,
    });

    const newPhotos = await this.boardRepository.find({
      where: {
        image: Not(IsNull()),
      },
      order: {
        id: 'DESC',
      },
      take: 6,
    });

    return {
      mainPhotos,
      announcementLatests,
      domesticBoardLikes,
      foreignBoardLikes,
      bitcoinBoardLikes,
      boardLikes,
      boardComments,
      newPhotos,
    };
  }
}
