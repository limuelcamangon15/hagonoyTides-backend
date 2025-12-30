import { IsNumber, IsString } from 'class-validator';

export class EntryTideDto {
  @IsNumber()
  tideLevel: number;

  @IsString()
  time: string;
}
