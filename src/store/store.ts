import { configureStore } from 'redux-starter-kit';

import { toastReducer } from '../components/atoms/Toast';
import { ToastState } from '../components/atoms/Toast/toastReducer';

export interface MoneyState {
  '@@toast': ToastState;
}

const store = configureStore<MoneyState>({
  reducer: {
    '@@toast': toastReducer,
  },
});

export default store;
