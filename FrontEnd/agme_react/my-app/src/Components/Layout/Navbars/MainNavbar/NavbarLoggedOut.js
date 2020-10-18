import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class loggedOutComponent extends Component {
  render() {
    return (
      <div className="right hide-on-med-and-down" data-test="logged-out-account-component">
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
