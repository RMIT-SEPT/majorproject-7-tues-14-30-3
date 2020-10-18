import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CustomerSignUp } from './CustomerSignUp';
import { findByTestAtrr } from './../../../Utils';
import { createCustomer } from '../../actions/custCreateActions';


Enzyme.configure({ adapter: new Adapter()});

// function to return shallow render
const setUp = (props={}) => {
    const component = shallow(<CustomerSignUp {...props} />);
    component.setState({loaded:true});
    return component;
};

describe('CustomerSignUp', () => {

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

    it('should render comfirming email input', () => {
        const wrapper = findByTestAtrr(component, 'confirm-email-field');
        expect(wrapper.length).toBe(1);
    });

    it('should render password input', () => {
        const wrapper = findByTestAtrr(component, 'password-field');
        expect(wrapper.length).toBe(1);
    });

    it('should render confirming password input', () => {
        const wrapper = findByTestAtrr(component, 'confirm-password-field');
        expect(wrapper.length).toBe(1);
    });

    it('should render first name input', () => {
        const wrapper = findByTestAtrr(component, 'first-name-field');
        expect(wrapper.length).toBe(1);
    });

    it('should render last name input', () => {
        const wrapper = findByTestAtrr(component, 'last-name-field');
        expect(wrapper.length).toBe(1);
    });

    it('should render address input', () => {
        const wrapper = findByTestAtrr(component, 'address-field');
        expect(wrapper.length).toBe(1);
    });

    it('should render sign up button', () => {
        const wrapper = findByTestAtrr(component, 'sign-up-button');
        expect(wrapper.length).toBe(1);
    });

});