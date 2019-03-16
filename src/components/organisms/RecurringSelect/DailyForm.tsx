import * as React from 'react';
import { Trans } from '@lingui/macro';

import { Recurrence } from '../../../helpers/recurring';
import { Input } from '../../atoms/Form';

interface DailyFormProps {
  value: Partial<Recurrence>;
  onIntervalChange: (nextValue: number) => void;
}

const DailyForm = ({
  value,
  onIntervalChange,
}: DailyFormProps): JSX.Element => (
  <div>
    <Trans>Every</Trans>{' '}
    <Input<number>
      type='number'
      value={value.interval || 0}
      onChange={onIntervalChange}
    />{' '}
    <Trans>days</Trans>
  </div>
);

export default DailyForm;
