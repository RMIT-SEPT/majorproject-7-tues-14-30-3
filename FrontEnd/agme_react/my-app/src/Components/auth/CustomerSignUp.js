import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CustomerSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      dob: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const M = window.M;
    const Calender = document.querySelector(".datepicker");
    M.Datepicker.init(Calender, {
      defaultDate: new Date(),
      format: this.calenderState.format,
      container: "body",
    });
  }

  calenderState = {
    value: new Date(),
    format: "dd mmm, yyyy",
    formatMoment: "dd MMM, YYYY",
  };

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m4 offset-m4">
            <div className="card">
              <div class="card-action blue darken-4 white-text">
                <Link to="/Dashboard">
                  <span class="white-text text-darken-2 center-align">
                    <h2>Agme Booking</h2>
                  </span>
                </Link>
              </div>
              <form onSubmit={this.handleSubmit}>
              <div class="card-content">
                <h7> What's your email?</h7>
                <div class="form-field">
                  <input
                    placeholder="Enter your email."
                    id="email"
                    type="email"
                    class="validate"
                    onChange={this.handleChange}
                  ></input>
                  <span
                    class="helper-text"
                    data-error="This email is invalid. Please make sure it's formatted like example@email.com"
                    data-success=""
                  ></span>
                </div>
              </div>
              <div className="card-content">
                <h7> Confirm your email</h7>
                <div className="form-field">
                  <input
                    placeholder="Enter your email again."
                    id="email"
                    type="email"
                    class="validate"
                  ></input>
                  <span
                    class="helper-text"
                    data-error="This email is invalid. Please make sure it's formatted like example@email.com"
                    data-success=""
                  ></span>
                </div>
              </div>
              <div class="card-content">
                <h7> Create a password</h7>
                <div class="form-field">
                  <input
                    placeholder="Create a password."
                    id="password"
                    type="password"
                    class="validate"
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <div class="card-content">
                <h7> Confirm your password</h7>
                <div class="form-field">
                  <input
                    placeholder="Enter your password again."
                    id="password"
                    type="password"
                    class="validate"
                  ></input>
                </div>
              </div>
              <div class="card-content">
                <h7> What's your username?</h7>
                <div class="form-field">
                  <input
                    placeholder="Enter a username."
                    id="username"
                    type="text"
                    class="validate"
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>

              <div class="card-content">
                <h7> What's your date of birth?</h7>
                <input
                  type="text"
                  id="dob"
                  class="datepicker"
                  placeholder="Choose your date of birth."
                  onChange={this.handleChange}
                ></input>
              </div>

              <div class="card-content">
                <h7> What's your gender?</h7>
                <p>
                  <br />
                  <label class="checkbox-left">
                    <input type="checkbox" />
                    <span>Male</span>
                  </label>
                  <label class="checkbox-middle">
                    <input type="checkbox" />
                    <span>Female</span>
                  </label>
                </p>
              </div>

              <div class="center-align">
                <button class="btn btn-block blue darken-4" type="submit">
                  Sign Up
                </button>
              </div>

              <div class="card-content center-align">
                <h7> Have an account?</h7>
                <Link to="/CustomerLogIn">
                  <h7>
                    <u> Log In.</u>
                  </h7>
                </Link>
                <div class="form-field"></div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
