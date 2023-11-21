import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'username1',
  })
  username: string;
  @ApiProperty({
    example: 'p@ssw0rd',
  })
  password: string;
}
