import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { I18nProvider } from '@lingui/react';

import theme from './utils/theme';
// @ts-ignore
import catalogFr from './locales/fr/messages';
// @ts-ignore
import catalogEn from './locales/en/messages';
import AppRouter from './AppRouter';
import { store } from './store';
import ToastContainer from './components/atoms/Toast/ToastContainer';

const catalogs = {
  en: catalogEn,
  fr: catalogFr,
};

const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <I18nProvider language='fr' catalogs={catalogs}>
      <Provider store={store}>
        <ToastContainer />
        <AppRouter />
      </Provider>
    </I18nProvider>
  </ThemeProvider>
);

export default App;
