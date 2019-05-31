import React from 'react';
import { mount } from 'enzyme';
import { render, fireEvent, getByTestId } from '@testing-library/react';

const noop = (): null => null;

import Select, { SelectOption } from './Select';

describe('Select', () => {
  const options: SelectOption<string>[] = [
    { value: 'one', label: 'Option one' },
    { value: 'two', label: 'Option two' },
    { value: 'three', label: 'Option three' },
  ];

  it('should render without crash', () => {
    const wrapper = mount(
      <Select value='one' options={options} onChange={noop} />,
    );

    expect(wrapper).toHaveLength(1);
  });

  it('should be closed by default', () => {
    const { container } = render(
      <Select value='one' options={options} onChange={noop} />,
    );

    expect(() => {
      getByTestId(container, 'select__option_list');
    }).toThrow();
  });

  it('should open on click', () => {
    const { container } = render(
      <Select value='one' options={options} onChange={noop} />,
    );

    const selectLabel = getByTestId(container, 'select__label');

    fireEvent.click(selectLabel);

    expect(() => {
      getByTestId(container, 'select__option_list');
    }).not.toThrow();
  });

  it('should have all options', () => {
    const { container } = render(
      <Select value='one' options={options} onChange={noop} />,
    );

    const selectLabel = getByTestId(container, 'select__label');

    fireEvent.click(selectLabel);

    expect(() => {
      getByTestId(container, 'select__option_list');
    }).not.toThrow();

    expect(() => {
      getByTestId(container, 'select__option_item-one');
    }).not.toThrow();

    expect(() => {
      getByTestId(container, 'select__option_item-two');
    }).not.toThrow();

    expect(() => {
      getByTestId(container, 'select__option_item-three');
    }).not.toThrow();
  });

  it('should handle change event on option click', () => {
    const handleChange = jest.fn();

    const { container } = render(
      <Select value='one' options={options} onChange={handleChange} />,
    );

    const selectLabel = getByTestId(container, 'select__label');

    fireEvent.click(selectLabel);

    expect(() => {
      getByTestId(container, 'select__option_list');
    }).not.toThrow();

    const selectOptionOne = getByTestId(container, 'select__option_item-one');

    fireEvent.click(selectOptionOne);

    expect(handleChange).toHaveBeenCalledWith('one');
  });
});
