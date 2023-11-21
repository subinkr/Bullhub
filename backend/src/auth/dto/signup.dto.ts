import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ example: 'username' })
  username: string;
  @ApiProperty({ example: 'p@ssw0rd' })
  password: string;
  @ApiProperty({ example: 'nickname' })
  nickname: string;
  @ApiProperty({
    example: null,
  })
  image: string;
}
