import { recurrenceToIceCubeRule } from './ice_cube';

describe('IceCube rule generator', () => {
  xit('should return an empty object', () => {});
});

describe('recurrenceToIceCubeRule', () => {
  it('should return correct IceCubeRule type', () => {
    expect(recurrenceToIceCubeRule('daily')).toBe('IceCube::DailyRule');
    expect(recurrenceToIceCubeRule('weekly')).toBe('IceCube::WeeklyRule');
    expect(recurrenceToIceCubeRule('monthly')).toBe('IceCube::MonthlyRule');
    expect(recurrenceToIceCubeRule('yearly')).toBe('IceCube::YearlyRule');

    expect(() => {
      recurrenceToIceCubeRule('infinitely' as any); // That `any` is okay, it's just to make the method throw
    }).toThrowError('Unknown recurrence `infinitely`');
  });
});
