import React from 'react';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainNavBar from './MainNavBar';
import { findByTestAtrr } from './../../../../../Utils';

Enzyme.configure({ adapter: new Adapter()});

// function to return shallow render
const setUp = (props={}) => {
    const component = shallow(<MainNavBar {...props} />);
    return component;
};

describe('MainNavbar', () => {

    // beforeEach runs before every single test
    let component;
    beforeEach(() => {
        component = setUp();
    })

    it('should find navbar class', () => {
        const wrapper = findByTestAtrr(component, 'navbar');
        expect(wrapper.length).toBe(1);
    });

    it('should render agme logo', () => {
        const wrapper = findByTestAtrr(component, 'logo');
        expect(wrapper.length).toBe(1);
    });
})