import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
    let component;
    const onChange = jest.fn();
    const props = {
        name: 'action',
        onChange
    };

    it('renders component without crashing', () => {
        const tree = renderer.create(<Checkbox />).toJSON;
        expect(tree).toMatchSnapshot();
    });

    beforeEach(() => component = mount(<Checkbox {...props} />));

    it('checks if onChange works', () => {
        component.find('input').simulate('change');
        expect(onChange).toBeCalled();
    });
});
