type IceCubeRule =
  | 'IceCube::DailyRule'
  | 'IceCube::WeeklyRule'
  | 'IceCube::MonthlyRule'
  | 'IceCube::YearlyRule';

export const recurrenceToIceCubeRule = (
  recurrence: 'daily' | 'weekly' | 'monthly' | 'yearly',
): IceCubeRule => {
  switch (recurrence) {
    case 'daily':
      return 'IceCube::DailyRule';

    case 'weekly':
      return 'IceCube::WeeklyRule';

    case 'monthly':
      return 'IceCube::MonthlyRule';

    case 'yearly':
      return 'IceCube::YearlyRule';

    default:
      throw new Error(`Unknown recurrence \`${recurrence}\``);
  }
};

export const iceCubeRuleToRecurrenceRule = (
  iceCubeRule: IceCubeRule,
): 'daily' | 'weekly' | 'monthly' | 'yearly' => {
  switch (iceCubeRule) {
    case 'IceCube::DailyRule':
      return 'daily';

    case 'IceCube::WeeklyRule':
      return 'weekly';

    case 'IceCube::MonthlyRule':
      return 'monthly';

    case 'IceCube::YearlyRule':
      return 'yearly';

    default:
      throw new Error(`Unknown ice cube rule\`${iceCubeRule}\``);
  }
};
