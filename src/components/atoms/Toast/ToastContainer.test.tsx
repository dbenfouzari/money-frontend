import React from 'react';
import { mount } from 'enzyme';
import { render, getByTestId } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import ToastContainer from './ToastContainer';

const middlewares: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any
const mockStore = configureStore(middlewares);

describe('ToastContainer', (): void => {
  it('should render without crash', (): void => {
    const initialState = { '@@toast': { items: [] } };
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <ToastContainer />
      </Provider>,
    );

    expect(wrapper).toHaveLength(1);
  });

  it('should have a toast', (): void => {
    const initialState = {
      '@@toast': {
        items: [
          {
            _id: 'abc',
            content: 'test',
            type: 'info',
          },
        ],
      },
    };
    const store = mockStore(initialState);

    const { container } = render(
      <Provider store={store}>
        <ToastContainer />
      </Provider>,
    );

    const toast = getByTestId(container, 'toast__item');

    expect(toast.textContent).toBe('test');
  });
});
