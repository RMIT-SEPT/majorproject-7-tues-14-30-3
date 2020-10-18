import React from 'react';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavbarLoggedIn from './NavbarLoggedIn';
import { findByTestAtrr } from './../../../../../Utils';
import { checkPropTypes } from 'prop-types';
import { CustomerLogIn } from '../../../auth/CustomerLogIn';

Enzyme.configure({ adapter: new Adapter()});

// function to return shallow render
const setUp = (props={}) => {
    const component = shallow(<NavbarLoggedIn {...props} />);
    return component;
};

describe('logged in MainNavbar', () => {

    // beforeEach runs before every single test
    let component;
    beforeEach(() => {
        component = setUp();
    })

    it('should not throw warning', () => {
        const expectedProps = {
            email: "james@gmail.com",
            password: "Password12",
            error: false
        };

        const propsErr = checkPropTypes(CustomerLogIn.propTypes, expectedProps, 'props', CustomerLogIn.name);
        expect(propsErr).toBeUndefined();
    })

    it('should find logged in account class', () => {
        const wrapper = findByTestAtrr(component, 'logged-in-account-component');
        expect(wrapper.length).toBe(1);
    });

    it('should render dropdown content', () => {
        const wrapper = findByTestAtrr(component, 'dropdown-content');
        expect(wrapper.length).toBe(1);
    });
})