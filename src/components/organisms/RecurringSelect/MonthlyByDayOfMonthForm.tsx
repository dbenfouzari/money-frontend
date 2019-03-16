import * as React from 'react';
import styled from 'styled-components';
import { Trans } from '@lingui/macro';

import { Recurrence, Validations } from '../../../helpers/recurring';

interface MonthlyByDayOfMonthFormProps {
  value: Partial<Recurrence>;
  onIntervalChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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

const MonthlyByDayOfMonthForm = ({
  value,
  onIntervalChange,
  onValidationsChange,
}: MonthlyByDayOfMonthFormProps): JSX.Element => {
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
      <input type='number' value={value.interval} onChange={onIntervalChange} />{' '}
      <Trans>months on:</Trans>
      <div>
        <Day selected={isSelected(1)} onClick={onDayClick(1)}>
          1
        </Day>
        <Day selected={isSelected(2)} onClick={onDayClick(2)}>
          2
        </Day>
        <Day selected={isSelected(3)} onClick={onDayClick(3)}>
          3
        </Day>
        <Day selected={isSelected(4)} onClick={onDayClick(4)}>
          4
        </Day>
        <Day selected={isSelected(5)} onClick={onDayClick(5)}>
          5
        </Day>
        <Day selected={isSelected(6)} onClick={onDayClick(6)}>
          6
        </Day>
        <Day selected={isSelected(7)} onClick={onDayClick(7)}>
          7
        </Day>
      </div>
      <div>
        <Day selected={isSelected(8)} onClick={onDayClick(8)}>
          8
        </Day>
        <Day selected={isSelected(9)} onClick={onDayClick(9)}>
          9
        </Day>
        <Day selected={isSelected(10)} onClick={onDayClick(10)}>
          10
        </Day>
        <Day selected={isSelected(11)} onClick={onDayClick(11)}>
          11
        </Day>
        <Day selected={isSelected(12)} onClick={onDayClick(12)}>
          12
        </Day>
        <Day selected={isSelected(13)} onClick={onDayClick(13)}>
          13
        </Day>
        <Day selected={isSelected(14)} onClick={onDayClick(14)}>
          14
        </Day>
      </div>
      <div>
        <Day selected={isSelected(15)} onClick={onDayClick(15)}>
          15
        </Day>
        <Day selected={isSelected(16)} onClick={onDayClick(16)}>
          16
        </Day>
        <Day selected={isSelected(17)} onClick={onDayClick(17)}>
          17
        </Day>
        <Day selected={isSelected(18)} onClick={onDayClick(18)}>
          18
        </Day>
        <Day selected={isSelected(19)} onClick={onDayClick(19)}>
          19
        </Day>
        <Day selected={isSelected(20)} onClick={onDayClick(20)}>
          20
        </Day>
        <Day selected={isSelected(21)} onClick={onDayClick(21)}>
          21
        </Day>
      </div>
      <div>
        <Day selected={isSelected(22)} onClick={onDayClick(22)}>
          22
        </Day>
        <Day selected={isSelected(23)} onClick={onDayClick(23)}>
          23
        </Day>
        <Day selected={isSelected(24)} onClick={onDayClick(24)}>
          24
        </Day>
        <Day selected={isSelected(25)} onClick={onDayClick(25)}>
          25
        </Day>
        <Day selected={isSelected(26)} onClick={onDayClick(26)}>
          26
        </Day>
        <Day selected={isSelected(27)} onClick={onDayClick(27)}>
          27
        </Day>
        <Day selected={isSelected(28)} onClick={onDayClick(28)}>
          28
        </Day>
      </div>
      <div>
        <Day selected={isSelected(29)} onClick={onDayClick(29)}>
          29
        </Day>
        <Day selected={isSelected(30)} onClick={onDayClick(30)}>
          30
        </Day>
        <Day selected={isSelected(31)} onClick={onDayClick(31)}>
          31
        </Day>
        <Day selected={isSelected(-1)} onClick={onDayClick(-1)}>
          <Trans>Last day</Trans>
        </Day>
      </div>
    </div>
  );
};

export default MonthlyByDayOfMonthForm;
