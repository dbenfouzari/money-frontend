import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Modal from '../../organisms/Modal';
import { addToast, updateToast } from '../../atoms/Toast/actions';

import EventForm from './EventForm';
// import moment from 'moment';

interface EventModel {
  name?: string;
  amount?: number;
  recurring?: string | null;
  start_date?: Date;
  [key: string]: string | number | null | Date | undefined;
}

interface GivenProps {
  isOpen: boolean;
  onClose: () => void;
  afterSubmit?: () => void;
}

interface GeneratedProps {
  addToast: (...args: any[]) => any;
  updateToast: (...args: any[]) => any;
}

type EventModalProps = GivenProps & GeneratedProps;

const ModalActions = styled.div`
  display: flex;
`;

const Action = styled.div`
  flex: 1;
  color: #eee;
  background-color: #333;
  padding: 20px;
  cursor: pointer;

  & + & {
    text-align: right;
    background-color: #295ef7;
  }
`;

const defaultValue: EventModel = {
  name: '',
  amount: 0,
  recurring: null,
  start_date: new Date(),
};

const EventModal = ({
  isOpen,
  onClose,
  addToast,
  updateToast,
  afterSubmit,
}: EventModalProps): JSX.Element => {
  const [value, setValue] = React.useState<EventModel>(defaultValue);

  const onValueChange = (nextValue: EventModel): void => {
    setValue(nextValue);
  };

  const onCancel = (): void => {
    setValue(defaultValue);
    onClose();
  };

  const onSubmit = (): void => {
    const data = addToast('<span>saving to api...</span>', 'info');
    const toastId = data.payload._id;

    fetch('http://localhost:3005/transactions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transaction: value,
      }),
    }).then((response: any) => {
      if (response.ok) {
        updateToast(toastId, '<span>Success !</span>', 'success');
        if (afterSubmit) afterSubmit();
        onClose();
      } else {
        updateToast(toastId, response.statusText, 'error');
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnBackdropClick>
      <div style={{ width: 700 }}>
        <EventForm value={value} onChange={onValueChange} />

        <ModalActions>
          <Action onClick={onCancel}>
            <span>Cancel</span>
          </Action>
          <Action onClick={onSubmit}>
            <span>Create</span>
          </Action>
        </ModalActions>
      </div>
    </Modal>
  );
};

const mapDispatchToProps = {
  addToast,
  updateToast,
};

export default connect(
  null,
  mapDispatchToProps,
)(EventModal);
