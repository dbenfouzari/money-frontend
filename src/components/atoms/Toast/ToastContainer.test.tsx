import React from 'react';
import { mount } from 'enzyme';
import { render, getByTestId } from 'react-testing-library';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import ToastContainer from './ToastContainer';

const middlewares: any[] = [];
const mockStore = configureStore(middlewares);

describe('ToastContainer', () => {
  it('should render without crash', () => {
    const initialState = { '@@toast': { items: [] } };
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <ToastContainer />
      </Provider>,
    );

    expect(wrapper).toHaveLength(1);
  });

  it('should have a toast', () => {
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
