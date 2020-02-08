import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import axios from 'axios';

import App from './App';

describe('App component', () => {
  let component;
  const movies = [{
    name: "Joni Baez",
    genres: ["action", 'triller', 'horror']
  }];

  beforeEach(() => component = mount(<App />));

  it('renders component without crashing', () => {
    const tree = renderer.create(<App />).toJSON;
    expect(tree).toMatchSnapshot();
  });

  it('tests', () => {
    axios.get = jest.fn();
    const setMovies = jest.fn().mock;
    const test = axios.get.mockImplementation(() => Promise.resolve(movies));
    // const setMovies = jest.fn().mockImplementation(test);
    // expect(setMovies).toBeCalled();

    console.log(test())
    console.log(setMovies)
    console.log(component.html())

  });

});


