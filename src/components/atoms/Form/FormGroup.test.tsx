import React from 'react';
import { shallow } from 'enzyme';

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
});
