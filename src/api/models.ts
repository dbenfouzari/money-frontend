export interface Transition {
  name?: string;
  amount?: number;
  recurring?: string;
  [key: string]: string | number | undefined;
}

export type RuleType =
  | 'IceCube::DailyRule'
  | 'IceCube::WeeklyRule'
  | 'IceCube::MonthlyRule'
  | 'IceCube::YearlyRule';

export interface IceCubeHash {
  rule_type?: RuleType;
  interval?: number;
  validations?: {
    [k in
      | 'day'
      | 'day_of_month'
      | 'day_of_week'
      | 'hour_of_day'
      | 'minute_of_hour']?: {}
  };
  until?: string;
}
