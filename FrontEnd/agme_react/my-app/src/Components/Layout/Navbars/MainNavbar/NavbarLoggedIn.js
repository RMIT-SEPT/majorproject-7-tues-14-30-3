import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class loggedInComponent extends Component {
  async componentDidMount() {
    const M = window.M;
    var elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, {
      coverTrigger: false,
    });
  }

  logOut() {
    localStorage.clear();
  }

  render() {
    return (
      <li class="waves-effect col s3" data-test="logged-in-account-component">
        <div>
          <a class="dropdown-trigger" data-target="dropdown">
            <i class="material-icons">account_circle</i>
            <span class="nav-text">
              Profile
              <i class="material-icons right">arrow_drop_down</i>
            </span>
          </a>
        </div>
        <ul
          id="dropdown"
          className="dropdown-content"
          data-test="dropdown-content"
        >
          <li>
            <Link id="RouterNavLink" to="/Account">
              Account
            </Link>
          </li>
          <li>
            <Link id="RouterNavLink" to="/Dashboard" onClick={this.logOut}>
              Logout
            </Link>
          </li>
        </ul>
      </li>
    );
  }
}
