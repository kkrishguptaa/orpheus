export default function getRelativeTime(date: Date) {
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  const units: {
    unit: Intl.RelativeTimeFormatUnit;
    ms: number;
  }[] = [
    { unit: 'year',   ms: 1000 * 60 * 60 * 24 * 365 },
    { unit: 'month',  ms: 1000 * 60 * 60 * 24 * 30 },
    { unit: 'day',    ms: 1000 * 60 * 60 * 24 },
    { unit: 'hour',   ms: 1000 * 60 * 60 },
    { unit: 'minute', ms: 1000 * 60 },
    { unit: 'second', ms: 1000 },
  ];

  for (const { unit, ms } of units) {
    const delta = diff / ms;
    if (Math.abs(delta) >= 1) {
      return new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
        .format(Math.round(delta), unit);
    }
  }

  return 'just now';
}
