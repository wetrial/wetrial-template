import React from 'react';
import { shallow } from 'enzyme';
import PageLoading from './index';

it('renders with loading', () => {
  const wrapper = shallow(<PageLoading />);
  expect(wrapper.text()).toEqual('<Spin />');
});
