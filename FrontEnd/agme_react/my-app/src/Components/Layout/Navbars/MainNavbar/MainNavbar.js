import React, { Component } from "react";
import NavbarLoggedIn from "./NavbarLoggedIn";
import NavbarLoggedOut from "./NavbarLoggedOut";
import { Link } from "react-router-dom";

export default class Navbar extends Component {


  render() {
    // assigning Navbar depending on whether user is logged in or not
    var accountComponent;
    if (localStorage.getItem("workerObject") !== null || localStorage.getItem("customerObject") !== null || localStorage.getItem("adminObject") !== null)  {
      accountComponent = <NavbarLoggedIn />;
    } else {
      accountComponent = <NavbarLoggedOut />;
    }

    return (
      <div data-test="navbar">
        <nav className="blue darken-4">
          <div className="container">
            <div className="nav-wrapper">
            <Link id="RouterNavLink" to="/Dashboard">
              <a href="/Dashboard" className="brand-logo" data-test="logo">
                Agme Booking
                <i className="material-icons">collections_bookmark</i>
              </a>
              </Link>
              <a href="" data-target="mobile-nav" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#contact">Contact Us</a>
                </li>
                <li>
                  <a>|</a>
                </li>
                {accountComponent}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
