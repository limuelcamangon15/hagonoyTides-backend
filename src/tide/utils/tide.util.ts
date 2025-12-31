export function adjustTideLevel(tideType: string, tideLevel: number): number {
  const HIGH_TIDE_OFFSET = 0.51;
  const LOW_TIDE_OFFSET = 0.52;
  const METERS_EQUIV_TO_ONE_FOOT = 3.28084;

  let offset = 0;

  if (tideType === 'High') {
    offset = HIGH_TIDE_OFFSET;
  } else {
    offset = LOW_TIDE_OFFSET;
  }

  //convert meters into feet
  const adjustedTideLevel = (tideLevel + offset) * METERS_EQUIV_TO_ONE_FOOT;

  return adjustedTideLevel;
}

export function generateDates(startDate: string): string[] {
  const dates: string[] = [];

  const start = new Date(startDate);
  const year = start.getFullYear();

  const current = new Date(start);

  while (current.getFullYear() === year) {
    dates.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 7);
  }
  return dates;
}
