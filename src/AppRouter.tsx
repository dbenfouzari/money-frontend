import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { CalendarPage, ChartsPage } from './components/pages';

const AppRouter = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={CalendarPage} />
      <Route path='/charts' component={ChartsPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
