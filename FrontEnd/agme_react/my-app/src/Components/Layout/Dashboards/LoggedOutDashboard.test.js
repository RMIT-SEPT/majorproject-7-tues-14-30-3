import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LoggedOutDashboard from './LoggedOutDashboard'
import { findByTestAtrr } from './../../../../Utils'

Enzyme.configure({ adapter: new Adapter()});

// function to return shallow render
const setUp = (props={}) => {
    const component = shallow(<LoggedOutDashboard {...props} />);
    return component;
};

describe('logged out dashboard', () => {

    // beforeEach runs before every single test
    let component;
    beforeEach(() => {
        component = setUp();
    })

    it('should find logged out dashboard', () => {
        const wrapper = findByTestAtrr(component, 'logged-out-dashboard');
        expect(wrapper.length).toBe(1);
    });

    it('should find logged out dashboard', () => {
        const wrapper = findByTestAtrr(component, 'sign-up-btn');
        expect(wrapper.length).toBe(1);
    });

})