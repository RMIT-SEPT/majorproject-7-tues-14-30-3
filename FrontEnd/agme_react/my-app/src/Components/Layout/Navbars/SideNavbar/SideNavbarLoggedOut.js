import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SideNavbar extends Component {
  render() {
    return (
      <div>
        <li>
          <Link id="RouterNavLink" to="/CustomerSignUp">
            Sign Up
          </Link>
        </li>
        <li>
          <Link id="RouterNavLink" to="/CustomerLogIn">
            Log In
          </Link>
        </li>
      </div>
    );
  }
}
