/* eslint-disable @typescript-eslint/no-explicit-any */
/* FIXME: Put real typings where `any` is set */

import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import 'moment/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTransactions } from '../../hooks';
import { TransactionEvent } from '../../hooks/useTransactions';
import { DefaultLayout } from '../templates';

interface ChartData {
  date: number;
  amount: number;
}
const eventsToData = (events: any[]): ChartData[] => {
  let initialAmount = 0;

  return events.map((event: any) => {
    initialAmount += event.amount;

    return {
      date: event.date,
      amount: initialAmount,
    };
  });
};

const numberToDate = (time: number | string): string =>
  new Date(Number(time)).toLocaleDateString();
const amountFormatter = (
  value: number | string | (number | string)[],
): string => `${Number(value) / 100}€`;

const renderTooltip = (value: any): JSX.Element | null => {
  if (value.active && value.payload) {
    return (
      <div
        style={{
          backgroundColor: '#fff',
          padding: 20,
          boxShadow: '0 0 5px 1px rgba(120, 120, 120, 0.2)',
        }}
      >
        Montant restant le {numberToDate(value.payload[0].payload.date)} :{' '}
        {amountFormatter(value.payload[0].payload.amount)}
      </div>
    );
  }

  return null;
};

const ChartsPage = (): JSX.Element => {
  const { date, changeDate, events } = useTransactions();

  const groupedEventsByDate = events.reduce<{
    [key: string]: TransactionEvent[];
  }>((prevGroup, event) => {
    (prevGroup[event.start_date] = prevGroup[event.start_date] || []).push(
      event,
    );
    return prevGroup;
  }, {});

  const mergedEvents = Object.values(groupedEventsByDate).map(
    eventGroup => ({
      date: new Date(eventGroup[0].start_date).getTime(),
      amount: eventGroup.reduce((tt, ev) => {
        tt = tt + ev.amount;
        return tt;
      }, 0),
    }),
    {},
  );

  const onPrevMonthClick = (): void => {
    const nextDate = new Date(date);
    nextDate.setMonth(date.getMonth() - 1);
    changeDate(nextDate);
  };

  const onTodayClick = (): void => {
    const nextDate = new Date();
    changeDate(nextDate);
  };

  const onNextMonthClick = (): void => {
    const nextDate = new Date(date);
    nextDate.setMonth(date.getMonth() + 1);
    changeDate(nextDate);
  };

  const domain = (): any => {
    const nextDate = new Date(date);
    nextDate.setDate(1);
    const domain1 = nextDate.getTime();

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const domain2 = lastDay.getTime();

    return [domain1, domain2];
  };

  return (
    <DefaultLayout>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={eventsToData(mergedEvents)}>
          <Line type='monotone' dataKey='amount' stroke='#8884d8' />

          <CartesianGrid stroke='#ccc' />

          <XAxis
            dataKey='date'
            type='number'
            domain={domain()}
            tickFormatter={numberToDate}
          />

          <YAxis tickFormatter={amountFormatter} />

          <Tooltip
            formatter={amountFormatter}
            labelFormatter={numberToDate}
            content={renderTooltip}
          />
        </LineChart>
      </ResponsiveContainer>

      <div
        className='actions'
        style={{ position: 'absolute', top: 120, right: 50 }}
      >
        <button style={{ marginLeft: 10 }} onClick={onPrevMonthClick}>
          Prev month
        </button>
        <button style={{ marginLeft: 10 }} onClick={onTodayClick}>
          Today
        </button>
        <button style={{ marginLeft: 10 }} onClick={onNextMonthClick}>
          Next month
        </button>
      </div>
    </DefaultLayout>
  );
};

export default ChartsPage;
