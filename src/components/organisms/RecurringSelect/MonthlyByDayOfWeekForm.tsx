import * as React from 'react';
import styled from 'styled-components';

import { Recurrence, Validations } from '../../../helpers/recurring';

interface MonthlyByDayOfWeekFormProps {
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

const MonthlyByDayOfWeekForm = ({
  value,
  onIntervalChange,
}: MonthlyByDayOfWeekFormProps): JSX.Element => (
  <div>
    Every{' '}
    <input type='number' value={value.interval} onChange={onIntervalChange} />{' '}
    months on :
    <div>
      <span>Week 1: </span>
      <Day>Sun</Day>
      <Day>Mon</Day>
      <Day>Tue</Day>
      <Day>Wed</Day>
      <Day>Thu</Day>
      <Day>Fri</Day>
      <Day>Sat</Day>
    </div>
    <div>
      <span>Week 2: </span>
      <Day>Sun</Day>
      <Day>Mon</Day>
      <Day>Tue</Day>
      <Day>Wed</Day>
      <Day>Thu</Day>
      <Day>Fri</Day>
      <Day>Sat</Day>
    </div>
    <div>
      <span>Week 3: </span>
      <Day>Sun</Day>
      <Day>Mon</Day>
      <Day>Tue</Day>
      <Day>Wed</Day>
      <Day>Thu</Day>
      <Day>Fri</Day>
      <Day>Sat</Day>
    </div>
    <div>
      <span>Week 4: </span>
      <Day>Sun</Day>
      <Day>Mon</Day>
      <Day>Tue</Day>
      <Day>Wed</Day>
      <Day>Thu</Day>
      <Day>Fri</Day>
      <Day>Sat</Day>
    </div>
  </div>
);

export default MonthlyByDayOfWeekForm;
