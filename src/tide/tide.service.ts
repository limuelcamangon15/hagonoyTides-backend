import { Injectable } from '@nestjs/common';
import { TideApiClient } from './clients/tide-api.client';
import { adjustTideLevel, generateDates } from './utils/tide.util';
import { Tide, TideDocument } from './schemas/tide.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TideService {
  constructor(
    private readonly tideApiClient: TideApiClient,
    @InjectModel(Tide.name)
    private readonly tideModel: Model<TideDocument>,
  ) {}

  async getTidesByYear(year: number) {
    return this.tideModel.findOne({ year: year });
  }

  async fetchAndStoreSevenDays(startDate: string) {
    const weeklyDates: string[] = generateDates(startDate);
    const year = new Date(startDate).getFullYear();

    const apiResponses = await Promise.all(
      weeklyDates.map((wd) => this.tideApiClient.fetchTide(wd)),
    );

    await this.tideModel.updateOne(
      { municipality: 'Hagonoy', province: 'Bulacan', year },
      {
        $setOnInsert: {
          municipality: 'Hagonoy',
          province: 'Bulacan',
          region: 3,
          year,
          monthlyTides: [],
        },
      },
      { upsert: true },
    );

    for (const apiResponse of apiResponses) {
      const monthlyData = this.transformToMonthly(apiResponse.extremes);

      for (const monthData of monthlyData) {
        await this.tideModel.updateOne(
          {
            municipality: 'Hagonoy',
            province: 'Bulacan',
            year,
            'monthlyTides.month': { $ne: monthData.month },
          },
          {
            $push: {
              monthlyTides: {
                month: monthData.month,
                dailyTides: [],
              },
            },
          },
        );

        await this.tideModel.updateOne(
          {
            municipality: 'Hagonoy',
            province: 'Bulacan',
            year,
          },
          {
            $push: {
              'monthlyTides.$[m].dailyTides': {
                $each: monthData.dailyTides,
              },
            },
          },
          {
            arrayFilters: [{ 'm.month': monthData.month }],
          },
        );
      }
    }

    return { status: 200, message: 'okay nasave na' };
  }

  private transformToMonthly(extremes: any[]) {
    const monthlyMap = new Map<string, any>();

    for (const item of extremes) {
      const dateObj = new Date(item.dt * 1000);

      const isoDate = dateObj.toLocaleDateString('en-CA', {
        timeZone: 'Asia/Manila',
      }); // YYYY-MM-DD
      const month = dateObj.toLocaleString('en-US', {
        month: 'long',
        timeZone: 'Asia/Manila',
      });
      const dayName = dateObj.toLocaleString('en-US', {
        weekday: 'long',
        timeZone: 'Asia/Manila',
      });
      const date = parseInt(
        dateObj.toLocaleString('en-US', {
          day: '2-digit',
          timeZone: 'Asia/Manila',
        }),
        10,
      );
      const time = dateObj.toLocaleTimeString('en-GB', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Manila',
      });

      const adjusted = adjustTideLevel(item.type, item.height);

      if (!monthlyMap.has(month)) {
        monthlyMap.set(month, {
          month,
          dailyTides: [],
        });
      }

      const dailyTides = monthlyMap.get(month).dailyTides;

      let dayEntry = dailyTides.find((d) => d.isoDate === isoDate);

      if (!dayEntry) {
        dayEntry = {
          isoDate,
          date,
          day: dayName,
          tides: [],
        };
        dailyTides.push(dayEntry);
      }

      dayEntry.tides.push({
        tideLevel: adjusted,
        time,
        type: item.type,
      });
    }

    return Array.from(monthlyMap.values());
  }
}
