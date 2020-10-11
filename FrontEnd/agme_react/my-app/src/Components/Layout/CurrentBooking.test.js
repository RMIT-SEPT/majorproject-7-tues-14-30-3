import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { CurrentBooking } from "./CurrentBooking";
import { findByTestAtrr } from "./../../../Utils";

Enzyme.configure({ adapter: new Adapter() });

// function to return shallow render and make a test account
const setUp = (props = {}) => {
  const component = shallow(<CurrentBooking {...props} />);
  const testAccount = {
    id: 1,
    firstName: "James",
    lastName: "Smith",
    username: "james@gmail.com",
    address: "40 Toorak Road",
    user: {
      firstName: "James",
      lastName: "Smith",
      username: "james@gmail.com",
      address: "40 Toorak Road",
    },
  };
  const accountType = "Customer";
  component.setState({
    loaded: true,
    sLoaded: true,
    profile: testAccount,
    account: accountType,
  });
  return component;
};

describe("Current Booking", () => {
  // beforeEach runs before every single test
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("should find current booking card", () => {
    const wrapper = findByTestAtrr(component, "current-bookings");
    expect(wrapper.length).toBe(1);
  });

  it("render account details", () => {
    const wrapper = findByTestAtrr(component, "account-details");
    expect(wrapper.length).toBe(1);
  });

  it("render booking details", () => {
    const wrapper = findByTestAtrr(component, "booking-details");
    expect(wrapper.length).toBe(1);
  });
});
