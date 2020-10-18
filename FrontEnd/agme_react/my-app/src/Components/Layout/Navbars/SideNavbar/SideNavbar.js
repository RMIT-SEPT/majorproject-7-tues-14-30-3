import React, { Component } from "react";
import SideNavbarLoggedIn from "./SideNavbarLoggedIn";
import SideNavbarLoggedOut from "./SideNavbarLoggedOut";

export class SideNavbar extends Component {

  render() {
    // assigning side navbar depending on whether user is logged in or not
    var sideNavAccountComponent;
    if (localStorage.getItem("currentUser") != null) {
      sideNavAccountComponent = <SideNavbarLoggedIn />;
    } else {
      sideNavAccountComponent = <SideNavbarLoggedOut />;
    }

    return (
      <ul className="sidenav" id="mobile-nav" data-test="side-nav">
        <li>
          <a href="#home" data-test="home">Home</a>
        </li>
        <li>
          <a href="#contact">Contact Us</a>
        </li>
        <div data-test="account-component">{sideNavAccountComponent}</div>
      </ul>
    );
  }
}

export default SideNavbar;
