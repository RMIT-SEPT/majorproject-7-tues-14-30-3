import React from 'react';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Booking} from './Booking';
import { findByTestAtrr } from './../../../Utils';

Enzyme.configure({ adapter: new Adapter()});

// function to return shallow render
const setUp = (props={}) => {
    const component = shallow(<Booking {...props} />);
    const res = ["Appointment","Consult"];
    component.setState({loaded:true});
    component.setState({services: res, sLoaded: true});
    component.setState({timesLoader: true});
    props.setState({times: times})
    return component;
};

describe('Booking', () => {

    // beforeEach runs before every single test
    let component;
    beforeEach(() => {
        component = setUp();
    })

    it('should find booking card', () => {
        const wrapper = findByTestAtrr(component, 'booking-card');
        expect(wrapper.length).toBe(1);
    });

    it('should render booking card services selection', () => {
        const wrapper = findByTestAtrr(component, 'booking-card-services');
        expect(wrapper.length).toBe(1);
    });

    it('should render date selection', () => {
        const wrapper = findByTestAtrr(component, 'date-picker');
        expect(wrapper.length).toBe(1);
    });

    it('should render start time selection', () => {
        const wrapper = findByTestAtrr(component, 'start-time-picker');
        expect(wrapper.length).toBe(1);
    });

    it('should render end time selection', () => {
        const wrapper = findByTestAtrr(component, 'end-time-picker');
        expect(wrapper.length).toBe(1);
    });

    
    it('should render booking button', () => {
        const wrapper = findByTestAtrr(component, 'book-btn');
        expect(wrapper.length).toBe(1);
    });

})
