import { useState, useEffect } from 'react';

export interface TransactionEvent {
  name: string;
  start_date: string;
  amount: number;
}

const getInitialDate = () => {
  const dateNow = new Date();
  dateNow.setHours(0, 0, 0, 0);
  return dateNow;
};

function useTransactions(fetchAgain?: number | string) {
  const [date, setDate] = useState<Date>(getInitialDate());
  const [events, setEvents] = useState<TransactionEvent[]>([]);

  useEffect(() => {
    fetch(
      `http://localhost:3005/transactions?start_date=${date.toISOString()}`,
      {
        headers: {
          'Content-Type': 'application/ld+json',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        setEvents(data.map((e: TransactionEvent) => ({ ...e, allDay: true })));
      });
  }, [date, fetchAgain]);

  function changeDate(nextDate: Date): void {
    const dateWithoutTime = new Date(nextDate);
    dateWithoutTime.setHours(0, 0, 0, 0);

    if (date.getTime() !== dateWithoutTime.getTime()) setDate(dateWithoutTime);
  }

  return { events, date, changeDate };
}

export default useTransactions;
