import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { I18nProvider } from '@lingui/react';

// @ts-ignore
import catalogFr from '../locales/fr/messages';
// @ts-ignore
import catalogEn from '../locales/en/messages';

import NotFound from './NotFound';

const catalogs = {
  en: catalogEn,
  fr: catalogFr,
};

describe('`NotFound` page', () => {
  it('renders without crashing', () => {
    shallow(<NotFound />);
  });

  it('should contain `404` message', () => {
    const wrapper = mount(
      <I18nProvider language='en' catalogs={catalogs}>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </I18nProvider>,
    );

    expect(wrapper.text()).toContain('404 - Not Found');
  });

  it('should contain a link to come back on home page', () => {
    const wrapper = mount(
      <I18nProvider language='en' catalogs={catalogs}>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </I18nProvider>,
    );

    expect(wrapper.text()).toContain('Come back to home page');
  });
});
