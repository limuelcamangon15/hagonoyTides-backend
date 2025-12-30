import { Type } from 'class-transformer';
import { EntryTideDto } from './entry-tide.dto';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class DailyTideDto {
  @IsString()
  isoDate: string;

  @IsNumber()
  date: number;

  @IsString()
  day: string;

  @IsArray()
  @Type(() => EntryTideDto)
  tide: EntryTideDto[];
}
