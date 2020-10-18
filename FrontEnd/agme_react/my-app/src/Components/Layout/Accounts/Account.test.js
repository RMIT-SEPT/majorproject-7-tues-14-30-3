import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Account } from "./Account";
import { findByTestAtrr } from "./../../../../Utils";

Enzyme.configure({ adapter: new Adapter() });

// function to return shallow render
const setUp = (props = {}) => {
  const component = shallow(<Account {...props} />);
  const user = {
    id: 1,
    user: {
      address: "12 Western Street",
      firstName: "James",
      lastName: "Carli",
      username: "james3021@gmail.com"
    }
  };
  const accountType = "Customer";
  component.setState({
    loaded: true,
    accountType: accountType,
    profile: user,
  });
  return component;
};

describe("account page", () => {
  // beforeEach runs before every single test
  let component;
  beforeEach(() => {
    component = setUp();
  });

  // testing the viewing account card
  if("should render progress bar", () => {
    const wrapper = findByTestAtrr(component, "progress-bar");
    expect(wrapper.length).toBe(1);
  });

  it("should find viewing account card", () => {
    const wrapper = findByTestAtrr(component, "viewing-account-card");
    expect(wrapper.length).toBe(1);
  });

  it("should find profile heading", () => {
    const wrapper = findByTestAtrr(component, "profile-heading");
    expect(wrapper.length).toBe(1);
  });

  it("should find profile heading", () => {
    const wrapper = findByTestAtrr(component, "email");
    expect(wrapper.length).toBe(1);
  });

  it("should find profile full name", () => {
    const wrapper = findByTestAtrr(component, "fullname");
    expect(wrapper.length).toBe(1);
  });

  it("should find profile adrress", () => {
    const wrapper = findByTestAtrr(component, "address");
    expect(wrapper.length).toBe(1);
  });

  it("should find edit profile button", () => {
    const wrapper = findByTestAtrr(component, "edit-profile-button");
    expect(wrapper.length).toBe(1);
  });

  // testing the editing account card
  it("should find edit account card", () => {
    component.setState({editStatus:true})
    const wrapper = findByTestAtrr(component, "editing-account-card");
    expect(wrapper.length).toBe(1);
  });

  it("should find edit profile header", () => {
    component.setState({editStatus:true})
    const wrapper = findByTestAtrr(component, "edit-profile-header");
    expect(wrapper.length).toBe(1);
  });

  it("should find edit email", () => {
    component.setState({editStatus:true})
    const wrapper = findByTestAtrr(component, "edit-email");
    expect(wrapper.length).toBe(1);
  });

  it("should find edit first name", () => {
    component.setState({editStatus:true})
    const wrapper = findByTestAtrr(component, "edit-first-name");
    expect(wrapper.length).toBe(1);
  });

  it("should find edit last name", () => {
    component.setState({editStatus:true})
    const wrapper = findByTestAtrr(component, "edit-last-name");
    expect(wrapper.length).toBe(1);
  });

  it("should find edit address", () => {
    component.setState({editStatus:true})
    const wrapper = findByTestAtrr(component, "edit-address");
    expect(wrapper.length).toBe(1);
  });

  it("should find edit address", () => {
    component.setState({editStatus:true})
    const wrapper = findByTestAtrr(component, "save-profile-button");
    expect(wrapper.length).toBe(1);
  });

});
