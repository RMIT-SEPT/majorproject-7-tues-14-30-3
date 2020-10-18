import React from 'react';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavbarLoggedOut from './NavbarLoggedOut';
import { findByTestAtrr } from './../../../../../Utils';

Enzyme.configure({ adapter: new Adapter()});

// function to return shallow render
const setUp = (props={}) => {
    const component = shallow(<NavbarLoggedOut {...props} />);
    return component;
};

describe('logged out MainNavbar', () => {

    // beforeEach runs before every single test
    let component;
    beforeEach(() => {
        component = setUp();
    })

    it('should find logged out account class', () => {
        const wrapper = findByTestAtrr(component, 'logged-out-account-component');
        expect(wrapper.length).toBe(1);
    });
})