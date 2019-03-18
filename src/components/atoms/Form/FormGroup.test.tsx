import React from 'react';
import { shallow, mount } from 'enzyme';

import { FormGroup } from '.';

describe('atoms/Form/FormGroup', () => {
  it('should render without crash', () => {
    const wrapper = shallow(
      <FormGroup>
        <span>Test</span>
      </FormGroup>,
    );

    expect(wrapper).toHaveLength(1);
  });

  it('should correctly handle label', () => {
    const wrapper = mount(<FormGroup>Hello</FormGroup>);

    expect(wrapper.find('span').exists()).toBe(true);
  });
});
