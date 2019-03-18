import React from 'react';
import { shallow } from 'enzyme';

import Label from './Label';

describe('atoms/Form/FormGroup', () => {
  it('should render without crash', () => {
    const wrapper = shallow(<Label>Test</Label>);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.contains('Test')).toBe(true);
  });
});
