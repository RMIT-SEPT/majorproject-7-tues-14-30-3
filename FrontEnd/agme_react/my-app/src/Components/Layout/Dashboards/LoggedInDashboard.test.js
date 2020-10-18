import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LoggedInDashboard from './LoggedInDashboard'
import { findByTestAtrr } from './../../../../Utils'

Enzyme.configure({ adapter: new Adapter()});

// function to return shallow render
const setUp = (props={}) => {
    const component = shallow(<LoggedInDashboard {...props} />);
    return component;
};

describe('logged in dashboard', () => {

    // beforeEach runs before every single test
    let component;
    beforeEach(() => {
        component = setUp();
    })

    it('should find logged in dashboard', () => {
        const wrapper = findByTestAtrr(component, 'logged-in-dashboard');
        expect(wrapper.length).toBe(1);
    });

    it('should find book button', () => {
        const wrapper = findByTestAtrr(component, 'book-btn');
        expect(wrapper.length).toBe(1);
    });
})