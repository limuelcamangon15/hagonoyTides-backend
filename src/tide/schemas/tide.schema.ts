import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TideDocument = Tide & Document;

@Schema({ _id: false })
class EntryTide {
  @Prop({ required: true })
  tideLevel: number;

  @Prop({ required: true })
  time: string;

  @Prop()
  type: string;
}

@Schema({ _id: false })
class DailyTide {
  @Prop({ required: true })
  isoDate: string;

  @Prop({ required: true })
  date: number;

  @Prop({ required: true })
  day: string;

  @Prop({ type: [EntryTide], default: [] })
  tides: EntryTide[];
}

@Schema({ _id: false })
class MonthlyTide {
  @Prop({ required: true })
  month: string;

  @Prop({ type: [DailyTide], default: [] })
  dailyTides: DailyTide[];
}

@Schema()
export class Tide {
  @Prop({ required: true })
  municipality: string;

  @Prop({ required: true })
  province: string;

  @Prop({ required: true })
  region: number;

  @Prop({ required: true })
  year: number;

  @Prop({ type: [MonthlyTide], default: [] })
  monthlyTides: MonthlyTide[];
}

export const TideSchema = SchemaFactory.createForClass(Tide);
