import React from 'react';
import { Route, Switch } from 'react-router';

import Home from './Home';
import NotFound from './NotFound';

const Routes = (): JSX.Element => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
