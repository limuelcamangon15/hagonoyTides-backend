import { Type } from 'class-transformer';
import { DailyTideDto } from './daily-tide.dto';
import { IsArray, IsString } from 'class-validator';

export class MonthlyTideDto {
  @IsString()
  month: string;

  @IsArray()
  @Type(() => DailyTideDto)
  dailyTide: DailyTideDto[];
}
