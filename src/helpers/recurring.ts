import moment, { Moment } from 'moment';

import {
  /* iceCubeRuleToRecurrenceRule, */ recurrenceToIceCubeRule,
} from './ice_cube';

export type ReadableRule =
  | 'daily'
  | 'weekly'
  | 'monthly (by day of week)'
  | 'monthly (by day of month)'
  | 'yearly';

export type RuleType =
  | 'IceCube::DailyRule'
  | 'IceCube::WeeklyRule'
  | 'IceCube::MonthlyRule'
  | 'IceCube::YearlyRule';

export type Validations = { [key: number]: number[] } | number[] | null; // FIXME: Better ?

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

export type IceCubeHashOrNull = IceCubeHash | null;

export interface Recurrence {
  rule: 'daily' | 'weekly' | 'monthly' | 'yearly' | '';
  interval: number;
  validations: Validations;
  /**
   * This is a 'YYYY-MM-DD' formatted date
   */
  until: string;
  /**
   * This is a 'HH:MM (AM|PM)' formatted date
   */
  startTime: string;
}

export const getRuleAndValidationObjectFromInput = (
  nextRule: ReadableRule,
): {
  rule: Recurrence['rule'];
  validations: Recurrence['validations'];
} => {
  let validations: Recurrence['validations'] = null;
  let rule: Recurrence['rule'] = 'weekly';

  switch (nextRule) {
    case 'weekly':
      validations = [];
      break;

    case 'monthly (by day of week)':
      rule = 'monthly';
      validations = { 1: [], 2: [], 3: [], 4: [] };
      break;

    case 'monthly (by day of month)':
      rule = 'monthly';
      validations = [];
      break;

    default:
      rule = nextRule;
      validations = null;
      break;
  }

  return { rule, validations };
};

export const getIntervalFromInput = (input: string | number): number =>
  Number(input);

export const getIceCubeHashFromRecurrence = (
  recurrence: Recurrence,
): IceCubeHashOrNull => {
  if (!recurrence.rule) return null;

  const iceCubeHash: IceCubeHash = {};
  const nextValidations: IceCubeHash['validations'] = {};

  const start: Moment = moment(recurrence.startTime, 'hh:mm a A');
  const hour = start.hour();
  const minute = start.minute();

  const interval = recurrence.interval;
  const validations = recurrence.validations || {};

  const ruleType: RuleType = recurrenceToIceCubeRule(recurrence.rule);

  if (Array.isArray(validations) && ruleType === 'IceCube::WeeklyRule') {
    nextValidations['day'] = validations;
  } else if (
    Array.isArray(validations) &&
    ruleType === 'IceCube::MonthlyRule'
  ) {
    nextValidations['day_of_month'] = validations;
  } else if (ruleType === 'IceCube::MonthlyRule') {
    nextValidations['day_of_week'] = validations;
  }

  nextValidations['hour_of_day'] = hour;
  nextValidations['minute_of_hour'] = minute;

  const until = recurrence.until;

  iceCubeHash['rule_type'] = ruleType;
  iceCubeHash['interval'] = interval;
  iceCubeHash['validations'] = nextValidations;
  iceCubeHash['until'] = until;

  return iceCubeHash;
};

// export const getIceCubeRuleToForm = (iceCubeHash: IceCubeHashOrNull): Recurrence => {
//   if (!iceCubeHash)
//     return {
//       rule: '',
//       validations: null,
//       interval: 1,
//       until: moment().format('YYYY-MM-DD'),
//       startTime: moment().format('HH:MM AM'),
//     };
//
//   const recurrenceHash = {};
//
//   const interval = iceCubeHash.interval;
//   const validations = iceCubeHash.validations || {};
//   const nextValidations: Validations = {};
//
//   const ruleType: Recurrence['rule'] = iceCubeRuleToRecurrenceRule(
//     iceCubeHash.rule_type!,
//   );
//
//   if (Array.isArray(validations) && ruleType === 'weekly') {
//     nextValidations['day'] = validations;
//   } else if (Array.isArray(validations) && ruleType === 'IceCube::MonthlyRule') {
//     nextValidations['day_of_month'] = validations;
//   } else if (ruleType === 'IceCube::MonthlyRule') {
//     nextValidations['day_of_week'] = validations;
//   }
// };
