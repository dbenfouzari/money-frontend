import React from 'react';
import { shallow } from 'enzyme';
import { fireEvent, render, cleanup } from '@testing-library/react';

import Modal from './Modal';

const noop = (): null => null;

afterEach(cleanup);

describe('Modal', (): void => {
  it('should render without crash', (): void => {
    const wrapper = shallow(
      <Modal isOpen={true} onClose={noop}>
        Test
      </Modal>,
    );

    expect(wrapper).toHaveLength(1);
  });

  it('should close on background click', (): void => {
    const onBackgroundClick = jest.fn();

    const { getByTestId } = render(
      <Modal
        isOpen={true}
        closeOnBackdropClick={true}
        onClose={onBackgroundClick}
      >
        Test
      </Modal>,
    );

    fireEvent.click(getByTestId('modal__background'));

    expect(onBackgroundClick).toHaveBeenCalled();
  });

  it('should do nothing on background click if no given fn', (): void => {
    const onBackgroundClick = jest.fn();

    const { getByTestId } = render(
      <Modal
        isOpen={true}
        onClose={onBackgroundClick}
        closeOnBackdropClick={false}
      >
        Test
      </Modal>,
    );

    fireEvent.click(getByTestId('modal__background'));

    expect(onBackgroundClick).not.toHaveBeenCalled();
  });

  it('should not close on modal click', (): void => {
    const onBackgroundClick = jest.fn();

    const { getByTestId } = render(
      <Modal
        isOpen={true}
        closeOnBackdropClick={true}
        onClose={onBackgroundClick}
      >
        Test
      </Modal>,
    );

    fireEvent.click(getByTestId('modal__modal'));

    expect(onBackgroundClick).not.toHaveBeenCalled();
  });

  it('should close on ESC keypress', (): void => {
    const onBackgroundClick = jest.fn();

    const { getByTestId } = render(
      <Modal
        isOpen={true}
        closeOnBackdropClick={true}
        onClose={onBackgroundClick}
      >
        Test
      </Modal>,
    );

    fireEvent.keyDown(getByTestId('modal__modal'), {
      key: 'Escape',
      code: 27,
      charCode: 27,
    });

    expect(onBackgroundClick).toHaveBeenCalled();
  });

  it('should do nothing on other keypress', (): void => {
    const onBackgroundClick = jest.fn();

    const { getByTestId } = render(
      <Modal
        isOpen={true}
        closeOnBackdropClick={true}
        onClose={onBackgroundClick}
      >
        Test
      </Modal>,
    );

    fireEvent.keyDown(getByTestId('modal__modal'), {
      key: 'Enter',
      code: 23,
      charCode: 23,
    });

    expect(onBackgroundClick).not.toHaveBeenCalled();
  });
});
