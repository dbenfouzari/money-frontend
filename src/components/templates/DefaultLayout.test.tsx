import React from 'react';
import { shallow } from 'enzyme';

import DefaultLayout from './DefaultLayout';

describe('DefaultLayout', () => {
  it('should mount successfully', () => {
    const wrapper = shallow(<DefaultLayout>Test</DefaultLayout>);

    expect(wrapper).toHaveLength(1);
  });
});
