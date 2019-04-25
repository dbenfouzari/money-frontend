import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const axe = require('react-axe');
  axe(React, ReactDOM, 1000);
}

const renderApp = (): void => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

if (module.hot) {
  module.hot.accept(
    './App',
    (): void => {
      renderApp();
    },
  );
}

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
