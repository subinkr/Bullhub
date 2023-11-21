import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CommentModel } from 'src/boards/entities/comment.entity';
import { UserModel } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Categories } from '../const/category.const';
import { BaseModel } from 'src/common/entities/base.entity';
import { LikeModel } from 'src/boards/entities/like.entity';
import { ViewModel } from 'src/boards/entities/view.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class BoardModel extends BaseModel {
  @Column()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  content: string;

  @Column({
    nullable: true,
  })
  @IsOptional()
  image?: string;

  @Column({
    enum: Object.values(Categories),
  })
  @IsNotEmpty()
  category: Categories;

  @ManyToOne(() => UserModel, (user) => user.boards, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: UserModel;

  @OneToMany(() => LikeModel, (like) => like.board, {
    eager: true,
  })
  likes: LikeModel[];

  @OneToMany(() => ViewModel, (view) => view.board, {
    eager: true,
  })
  views: ViewModel[];

  @OneToMany(() => CommentModel, (comment) => comment.board, {
    eager: true,
  })
  comments: CommentModel[];

  @Column({
    default: 0,
  })
  likesCount: number;
  @Column({
    default: 0,
  })
  viewsCount: number;
  @Column({
    default: 0,
  })
  commentsCount: number;
}
