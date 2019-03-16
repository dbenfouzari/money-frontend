import * as React from 'react';
import { Trans } from '@lingui/macro';
import styled from 'styled-components';

import { Recurrence, Validations } from '../../../helpers/recurring';
import { Input } from '../../atoms/Form';

interface WeeklyFormProps {
  value: Partial<Recurrence>;
  onIntervalChange: (nextValue: number) => void;
  onValidationsChange: (nextValidations: Validations) => void;
}

const Day = styled.span<{ selected?: boolean }>`
  background-color: ${props =>
    props.selected ? 'rgba(188, 234, 254, 0.76)' : '#fff'};
  border: 1px solid #1d5d90;
  padding: 10px;
  display: inline-block;
  user-select: none;
  min-width: 42px;
  text-align: center;
`;

const WeeklyForm = ({
  value,
  onIntervalChange,
  onValidationsChange,
}: WeeklyFormProps): JSX.Element => {
  const onDayClick = (dayValue: number): any => (): void => {
    const days = [...(value.validations as number[])];
    const index = days.indexOf(dayValue);

    if (index > -1) {
      days.splice(index, 1);
    } else {
      days.push(dayValue);
    }

    onValidationsChange(days);
  };

  const isSelected = (day: number): boolean => {
    const dayIndex = (value.validations as number[]).indexOf(day);

    return dayIndex !== -1;
  };

  return (
    <div>
      <Trans>Every</Trans>{' '}
      <Input<number>
        type='number'
        value={value.interval || 0}
        onChange={onIntervalChange}
      />{' '}
      <Trans>days on:</Trans>
      <div>
        <Day selected={isSelected(0)} onClick={onDayClick(0)}>
          <Trans>Sun</Trans>
        </Day>
        <Day selected={isSelected(1)} onClick={onDayClick(1)}>
          <Trans>Mon</Trans>
        </Day>
        <Day selected={isSelected(2)} onClick={onDayClick(2)}>
          <Trans>Tue</Trans>
        </Day>
        <Day selected={isSelected(3)} onClick={onDayClick(3)}>
          <Trans>Wed</Trans>
        </Day>
        <Day selected={isSelected(4)} onClick={onDayClick(4)}>
          <Trans>Thu</Trans>
        </Day>
        <Day selected={isSelected(5)} onClick={onDayClick(5)}>
          <Trans>Fri</Trans>
        </Day>
        <Day selected={isSelected(6)} onClick={onDayClick(6)}>
          <Trans>Sat</Trans>
        </Day>
      </div>
    </div>
  );
};

export default WeeklyForm;
