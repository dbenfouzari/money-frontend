import { createSelector } from 'redux-starter-kit';

import { MoneyState } from '../../../store/store';

import { Toast } from './types';

export const getToasts = createSelector<MoneyState, Toast[]>(['@@toast.items']);
