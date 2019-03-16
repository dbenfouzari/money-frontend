import * as React from 'react';
// import { t, Trans } from '@lingui/macro';
import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';

import {
  // ReadableRule,
  Recurrence,
  getRuleAndValidationObjectFromInput,
  getIntervalFromInput,
  Validations,
  ReadableRule,
} from '../../../helpers/recurring';
import { Select } from '../../atoms/Form';
import { SelectOption } from '../../atoms/Form/Select';

import DailyForm from './DailyForm';
import WeeklyForm from './WeeklyForm';
import MonthlyByDayOfWeekForm from './MonthlyByDayOfWeekForm';
import MonthlyByDayOfMonthForm from './MonthlyByDayOfMonthForm';
import YearlyForm from './YearlyForm';

const RecurringSelect = ({
  i18n,
  value: modelValue,
  onChange,
}: any): JSX.Element => {
  const [value, setValue] = React.useState<Partial<Recurrence>>({
    interval: 1,
    until: '2020-02-02',
    startTime: '10:00 AM',
    validations: [],
  });
  const [selectedRule, setSelectedRule] = React.useState('');

  const onRuleChange = (nextRule: string): void => {
    const { rule, validations } = getRuleAndValidationObjectFromInput(
      nextRule as ReadableRule,
    );

    const nextValue = { ...value, rule, validations };

    setSelectedRule(nextRule);
    setValue(nextValue);
    onChange(nextValue);
  };

  const handleInputIntervalChange = (nextInputValue: number): void => {
    const interval = getIntervalFromInput(nextInputValue);

    const nextValue = { ...value, interval };
    setValue(nextValue);
    onChange(nextValue);
  };

  const handleIntervalChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const interval = getIntervalFromInput(event.target.value);

    const nextValue = { ...value, interval };
    onChange(nextValue);

    setValue(nextValue);
  };

  const handleValidationsChange = (nextValidations: Validations): void => {
    const nextValue = { ...value, validations: nextValidations };
    onChange(nextValue);
    setValue(nextValue);
  };

  const renderSecondPart = (): JSX.Element | null => {
    if (selectedRule === '') {
      return null;
    }

    switch (selectedRule) {
      case 'daily':
        return (
          <DailyForm
            value={value}
            onIntervalChange={handleInputIntervalChange}
          />
        );
      case 'weekly':
        return (
          <WeeklyForm
            value={value}
            onIntervalChange={handleInputIntervalChange}
            onValidationsChange={handleValidationsChange}
          />
        );
      case 'monthly (by day of week)':
        return (
          <MonthlyByDayOfWeekForm
            value={value}
            onIntervalChange={handleIntervalChange}
            onValidationsChange={handleValidationsChange}
          />
        );
      case 'monthly (by day of month)':
        return (
          <MonthlyByDayOfMonthForm
            value={value}
            onIntervalChange={handleIntervalChange}
            onValidationsChange={handleValidationsChange}
          />
        );
      case 'yearly':
        return (
          <YearlyForm
            value={value}
            onIntervalChange={handleIntervalChange}
            onValidationsChange={handleValidationsChange}
          />
        );
      default:
        return null;
    }
  };

  const options: SelectOption<string>[] = [
    { value: '', label: i18n._(t`No recurrence`) },
    { value: 'daily', label: i18n._(t`Daily`) },
    { value: 'weekly', label: i18n._(t`Weekly`) },
    {
      value: 'monthly (by day of week)',
      label: i18n._(t`Monthly (by day of week)`),
    },
    {
      value: 'monthly (by day of month)',
      label: i18n._(t`Monthly (by day of month)`),
    },
    { value: 'yearly', label: i18n._(t`Yearly`) },
  ];

  return (
    <div className='form-control'>
      <Select<string>
        onChange={onRuleChange}
        value={selectedRule}
        options={options}
      />

      {renderSecondPart()}
    </div>
  );
};

export default withI18n()(RecurringSelect);
