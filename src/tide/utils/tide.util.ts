export function adjustTideLevel(tideType: string, tideLevel: number): number {
  const HIGH_TIDE_OFFSET = 0.51;
  const LOW_TIDE_OFFSET = 0.52;

  let offset = 0;

  if (tideType === 'High') {
    offset = HIGH_TIDE_OFFSET;
  } else {
    offset = LOW_TIDE_OFFSET;
  }

  const adjustedTideLevel = tideLevel + offset;

  return adjustedTideLevel;
}
