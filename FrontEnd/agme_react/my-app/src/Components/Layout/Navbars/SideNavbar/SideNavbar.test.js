import React from 'react';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SideNavBar from './SideNavBar';
import { findByTestAtrr } from './../../../../../Utils';

Enzyme.configure({ adapter: new Adapter()});

// function to return shallow render
const setUp = (props={}) => {
    const component = shallow(<SideNavBar {...props} />);
    return component;
};

describe('SideNavbar', () => {

    // beforeEach runs before every single test
    let component;
    beforeEach(() => {
        component = setUp();
    })

    it('should find sidenav class', () => {
        const wrapper = findByTestAtrr(component, 'side-nav');
        expect(wrapper.length).toBe(1);
    });

    it('should render home option', () => {
        const wrapper = findByTestAtrr(component, 'home');
        expect(wrapper.length).toBe(1);
    });

    it('should render account component', () => {
        const wrapper = findByTestAtrr(component, 'account-component');
        expect(wrapper.length).toBe(1);
    });

})