import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Topbar from './components/organisms/Topbar';
import Sidebar from './components/organisms/Sidebar';
import Content from './components/organisms/Content';
import { CalendarPage, ChartsPage } from './components/pages';

const AppRouter = (): JSX.Element => (
  <Router>
    <>
      <Topbar />
      <Sidebar />

      <Content>
        <Route path='/' exact component={CalendarPage} />
        <Route path='/charts' component={ChartsPage} />
      </Content>
    </>
  </Router>
);

export default AppRouter;
