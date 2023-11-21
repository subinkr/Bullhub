import { PickType } from '@nestjs/mapped-types';
import { BoardModel } from '../entities/board.entity';
import { IsOptional, IsString } from 'class-validator';
import { Categories } from '../const/category.const';
import { ApiProperty } from '@nestjs/swagger';

export class BoardDto extends PickType(BoardModel, [
  'title',
  'content',
  'image',
  'category',
]) {
  @ApiProperty({ example: 'title' })
  title: string;
  @ApiProperty({ example: 'content' })
  content: string;
  @ApiProperty({ example: Categories.BITCOIN })
  category: Categories;
  @ApiProperty({ example: null })
  image?: string;
}
