import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { I18nProvider } from '@lingui/react';

import theme from './utils/theme';
// @ts-ignore
import catalogFr from './locales/fr/messages';
// @ts-ignore
import catalogEn from './locales/en/messages';
import Routes from './pages/Routes';

const catalogs = {
  en: catalogEn,
  fr: catalogFr,
};

const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <I18nProvider language='fr' catalogs={catalogs}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </I18nProvider>
  </ThemeProvider>
);

export default App;
