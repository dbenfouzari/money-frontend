import React from 'react';
import { shallow } from 'enzyme';
// Create the mock store
import configureMockStore from 'redux-mock-store';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import ToastItem from './ToastItem';

const mockStore = configureMockStore();

jest.useFakeTimers();

describe('ToastItem', (): void => {
  it('should render without crash', (): void => {
    const store = mockStore({
      '@@toast': { items: [{ _id: 'abc', content: 'A toast', type: 'info' }] },
    });

    const wrapper = shallow(
      <Provider store={store}>
        <ToastItem item={{ _id: 'abc', content: 'A toast', type: 'info' }} />
      </Provider>,
    );

    jest.runAllTimers();

    expect(wrapper).toHaveLength(1);
  });

  it('should render without crash', (): void => {
    const store = mockStore({
      '@@toast': { items: [{ _id: 'abc', content: 'A toast', type: 'info' }] },
    });
    const actions = store.getActions();

    render(
      <Provider store={store}>
        <ToastItem item={{ _id: 'abc', content: 'A toast', type: 'info' }} />
      </Provider>,
    );

    jest.advanceTimersByTime(5000);

    expect(actions).toEqual([
      {
        type: '@@toasts/REMOVE_TOAST',
        payload: 'abc',
      },
    ]);
  });

  it('clear the timeout', (): void => {
    const store = mockStore({
      '@@toast': { items: [{ _id: 'abc', content: 'A toast', type: 'info' }] },
    });

    const { container } = render(
      <Provider store={store}>
        <ToastItem item={{ _id: 'abc', content: 'A toast', type: 'info' }} />
      </Provider>,
    );

    ReactDOM.unmountComponentAtNode(container);

    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });
});
