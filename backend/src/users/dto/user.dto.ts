import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'nickname' })
  nickname: string;
  @ApiProperty({ example: null })
  image: string;
}
