import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CustomerLogIn } from './CustomerLogIn';
import { findByTestAtrr } from './../../../Utils';

Enzyme.configure({ adapter: new Adapter()});

// function to return shallow render
const setUp = (props={}) => {
    const component = shallow(<CustomerLogIn {...props} />);
    return component;
};

describe('CustomerLogIn', () => {

    // beforeEach runs before every single test
    let component;
    beforeEach(() => {
        component = setUp();
    })

    it('should find card class', () => {
        const wrapper = findByTestAtrr(component, 'card');
        expect(wrapper.length).toBe(1);
    });

    it('should render the header', () => {
        const h2 = findByTestAtrr(component, 'header');
        expect(h2.length).toBe(1);
    });

    it('should render email input', () => {
        const wrapper = findByTestAtrr(component, 'email-field');
        expect(wrapper.length).toBe(1);
    });

    it('should render password input', () => {
        const wrapper = findByTestAtrr(component, 'password-field');
        expect(wrapper.length).toBe(1);
    });

    it('should render log in button', () => {
        const button = findByTestAtrr(component, 'log-in-button');
        expect(button.length).toBe(1);
    });

    it('should render sign up button', () => {
        const button = findByTestAtrr(component, 'signUpButton');
        expect(button.length).toBe(1);
    });

})