import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Trans } from '@lingui/macro';

import { FormGroup, Input, Label } from '../../atoms';
import RecurringSelect from '../../organisms/RecurringSelect';
import { getIceCubeHashFromRecurrence } from '../../../helpers/recurring';

interface EventModel {
  name?: string;
  amount?: number;
  recurring?: string | null;
  start_date?: Date;
  [key: string]: string | number | null | Date | undefined;
}

interface EventFormProps {
  value: EventModel;
  onChange: (nextEvent: EventModel) => void;
}

const EventForm = ({ value, onChange }: EventFormProps): JSX.Element => {
  const onInputChange = (
    fieldName: keyof EventModel,
  ): ((nextValue: string | number | Date | null) => void) => (
    nextValue: string | number | Date | null,
  ): void => {
    onChange({
      ...value,
      [fieldName]: nextValue || undefined,
    });
  };

  const onAmountChange = (nextValue: number) => {
    onChange({
      ...value,
      amount: nextValue * 100,
    });
  };

  return (
    <form style={{ padding: 20 }} id='event-form'>
      <h3
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: 0,
        }}
      >
        <Trans>Create a transaction</Trans>
      </h3>

      <FormGroup>
        <Label>Nom</Label>
        <Input<string>
          type='text'
          value={value.name || ''}
          onChange={onInputChange('name')}
        />
      </FormGroup>

      <FormGroup>
        <Label>Montant</Label>
        <Input<number>
          type='number'
          value={(value.amount || 0) / 100}
          onChange={onAmountChange}
        />
      </FormGroup>

      <FormGroup>
        <Label>Recurring</Label>
        <Input<string>
          type='text'
          value={value.recurring || ''}
          onChange={onInputChange('recurring')}
        />
      </FormGroup>

      <FormGroup>
        <Label>Récurrence</Label>
        <RecurringSelect
          value={value.recurring}
          onChange={(nextValue: any) =>
            onInputChange('recurring')(
              JSON.stringify(getIceCubeHashFromRecurrence(nextValue)),
            )
          }
        />
      </FormGroup>

      <FormGroup>
        <Label>Date de début</Label>
        <DatePicker
          selected={value.start_date}
          onChange={onInputChange('start_date')}
        />
      </FormGroup>
    </form>
  );
};

export default EventForm;
