import React from 'react';
import { shallow } from 'enzyme';

import Input, { StyledInput } from './Input';

describe('atoms/Form/Input', () => {
  it('should render without crash', () => {
    const wrapper = shallow(
      <Input<string> value='abc' onChange={() => null} />,
    );

    expect(wrapper).toHaveLength(1);
  });

  it('should call onChange event', () => {
    const onChange = jest.fn();

    const wrapper = shallow(<Input<string> value='abc' onChange={onChange} />);

    wrapper.simulate('change', { target: { value: 'zbra' } });

    expect(onChange).toHaveBeenCalledWith('zbra');
  });

  it('should work with number value', () => {
    const onChange = jest.fn();

    const wrapper = shallow(<Input<number> value={123} onChange={onChange} />);

    expect(wrapper.find(StyledInput).prop('value')).toBe(123);

    wrapper.simulate('change', { target: { value: 456 } });

    expect(onChange).toHaveBeenCalledWith(456);
  });

  it('should work with date value', () => {
    const onChange = jest.fn();
    const dateValue = new Date();

    const wrapper = shallow(
      <Input<Date> value={dateValue} onChange={onChange} />,
    );

    expect(wrapper.find(StyledInput).prop('value')).toBe(dateValue.getTime());

    wrapper.simulate('change', { target: { value: new Date(2019, 1, 2) } });

    expect(onChange).toHaveBeenCalledWith(new Date(2019, 1, 2));
  });

  it('should work without value', () => {
    const onChange = jest.fn();
    const value = null;

    const wrapper = shallow(
      <Input<string> value={value} onChange={onChange} />,
    );

    expect(wrapper.find(StyledInput).prop('value')).toBe('');
  });

  it('should work with bad value', () => {
    const onChange = jest.fn();
    const value = (): void => void 0;

    const wrapper = shallow(
      <Input<string> value={value as any} onChange={onChange} />,
    );

    expect(wrapper.find(StyledInput).prop('value')).toBe('');
  });
});
