import { Type } from 'class-transformer';
import { MonthlyTideDto } from './monthly-tide.dto';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateTideDto {
  @IsString()
  municipality: string;

  @IsString()
  province: string;

  @IsNumber()
  region: number;

  @IsNumber()
  year: number;

  @IsArray()
  @Type(() => MonthlyTideDto)
  monthlyTide: MonthlyTideDto[];
}
