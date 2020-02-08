import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import MovieList from './MovieList';

const mockProps = [
        {
            original_title: 'Title one',
            poster_path: '',
            id: 1,
            genres: ['action', 'horror']
        },
        {
            original_title: 'Title two',
            poster_path: '',
            id: 2,
            genres: ['action', 'comedy']
        }
    ];


describe('MovieList', () => {
    let component;

    it('renders component without crashing', () => {
        const tree = renderer.create(<MovieList />).toJSON;
        expect(tree).toMatchSnapshot();
    });

    beforeEach(() => component = mount(<MovieList movies={mockProps} />));
    it('should render movie list', () => {
        expect(component.find(".movie-list ul li").length).toEqual(2);
        expect(component.find(".movie-list ul li").first().find("h3").text()).toBe('Title one');
        expect(component.find(".genres h6").first().text()).toBe('action');
    });

    it('should render genres list', () => {
        expect(component.find(".genres").length).toEqual(2);
    });
});
