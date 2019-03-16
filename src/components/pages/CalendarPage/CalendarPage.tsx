import React from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarPage.css';
import { MdAdd as AddIcon } from 'react-icons/md';

import ButtonFab from '../../atoms/ButtonFab';
import { useTransactions } from '../../../hooks';
import { TransactionEvent } from '../../../hooks/useTransactions';

import EventModal from './EventModal';

const localizer = Calendar.momentLocalizer(moment);

const CalendarPage = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [manuallyFetch, setManuallyFetch] = React.useState(1);

  const { date, events, changeDate } = useTransactions(manuallyFetch);

  const onAddClick = (): void => {
    setIsModalOpen(true);
  };

  const onModalClose = (): void => {
    setIsModalOpen(false);
  };

  const afterSubmit = () => {
    setManuallyFetch(manuallyFetch + 1);
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        titleAccessor={(event: TransactionEvent) =>
          `${event.name} - ${event.amount / 100}€`
        }
        startAccessor={(event: TransactionEvent) => new Date(event.start_date)}
        endAccessor={event => new Date(event.start_date)}
        onNavigate={changeDate}
        date={date}
        views={['day', 'month']}
      />

      <ButtonFab onClick={onAddClick}>
        <AddIcon />
      </ButtonFab>

      <EventModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        afterSubmit={afterSubmit}
      />
    </>
  );
};

export default CalendarPage;
