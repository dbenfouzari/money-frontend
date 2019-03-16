import * as React from 'react';

import { Recurrence, Validations } from '../../../helpers/recurring';

interface YearlyFormProps {
  value: Partial<Recurrence>;
  onIntervalChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onValidationsChange: (nextValidations: Validations) => void;
}

const YearlyForm = ({
  value,
  onIntervalChange,
}: YearlyFormProps): JSX.Element => (
  <div>
    Every{' '}
    <input type='number' value={value.interval} onChange={onIntervalChange} />{' '}
    years
  </div>
);

export default YearlyForm;
