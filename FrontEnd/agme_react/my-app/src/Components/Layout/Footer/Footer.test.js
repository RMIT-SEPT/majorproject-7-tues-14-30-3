import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from './Footer';
import { findByTestAtrr } from './../../../../Utils';

Enzyme.configure({ adapter: new Adapter()});

// function to return shallow render
const setUp = (props={}) => {
    const component = shallow(<Footer {...props} />);
    return component;
};

describe('Footer', () => {

    // beforeEach runs before every single test
    let component;
    beforeEach(() => {
        component = setUp();
    })

    it('should find footer class', () => {
        const wrapper = findByTestAtrr(component, 'footer');
        expect(wrapper.length).toBe(1);
    });

    it('should render social links', () => {
        const wrapper = findByTestAtrr(component, 'social-links');
        expect(wrapper.length).toBe(1);
    });

    it('should render facebook link', () => {
        const wrapper = findByTestAtrr(component, 'facebook-link');
        expect(wrapper.length).toBe(1);
    });

    it('should render twitter link', () => {
        const wrapper = findByTestAtrr(component, 'twitter-link');
        expect(wrapper.length).toBe(1);
    });

    it('should render linkedIn link', () => {
        const wrapper = findByTestAtrr(component, 'linkedIn-link');
        expect(wrapper.length).toBe(1);
    });

    it('should render instagram link', () => {
        const wrapper = findByTestAtrr(component, 'instagram-link');
        expect(wrapper.length).toBe(1);
    });

})