import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Rating from './Rating';


describe('Rating', () => {
    let component;
    const handleChange = jest.fn();
    const props = {
        onChange: handleChange
    };

    it('renders component without crashing', () => {
        const tree = renderer.create(<Rating />).toJSON;
        expect(tree).toMatchSnapshot();
    });

    beforeEach(() => component = mount(<Rating {...props} />));

    it('checks if setValue works', () => {
        const event = {
            target: {value: 5}
        };

        expect(component.find('label').text()).toBe('Sort by rating 3');

        component.find('input').simulate('change', event);
        expect(handleChange).toHaveBeenCalledWith(5);
        expect(component.find('label').text()).toBe('Sort by rating 5');
    });
});
