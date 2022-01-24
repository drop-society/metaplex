import { dateToHHMM } from 'src/reusableTimePicker';
import { DateTime } from 'luxon';

describe('TimePicker: dateToHHMM', () => {
  // Note: timezone always local timezone

  test('dateToHHMM ISO string (Local Timezone)', () => {
    const testStr = DateTime.fromISO('2020-12-04T14:37:00').toLocal().toISO();
    expect(dateToHHMM(testStr)).toBe('14:37');
  });

  test('dateToHHMM JS Date (Local Timezone)', () => {
    const testStr = DateTime.fromISO('2020-12-04T14:37:00')
      .toLocal()
      .toJSDate();
    expect(dateToHHMM(testStr)).toBe('14:37');
  });

  test('dateToHHMM Date Object with hours set to 00:30 (00:30AM)', () => {
    const testDate = DateTime.fromJSDate(new Date(2021, 4, 22, 0, 30))
      .toLocal()
      .toJSDate();
    expect(dateToHHMM(testDate)).toBe('00:30');
  });
});
