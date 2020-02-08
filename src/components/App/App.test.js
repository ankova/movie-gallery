import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import App from './App';

describe('App component', () => {
  let component;

  beforeEach(() => component = mount(<App />));

  it('renders component without crashing', () => {
    const tree = renderer.create(<App />).toJSON;
    expect(tree).toMatchSnapshot();
  });
});


