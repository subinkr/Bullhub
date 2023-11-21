import { IsNumber } from 'class-validator';

export class RoomDto {
  @IsNumber({}, { each: true })
  ids: number[];
}
