import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "../Navbars/MainNavbar/MainNavbar";
import { updateAccount } from "../../../actions/updateActions";
import axios from "axios";

export class Account extends Component {
  constructor(props) {
    super(props);
    var user;
    var accountType;
    var serviceValue;

    //checks what kind of user is logged in and saves the user into the user variable
    //while also setting accountType appropriately

    if (localStorage.getItem("customerObject") !== null) {
      user = JSON.parse(localStorage.getItem("customerObject"));
      accountType = "Customer";
    } else if (localStorage.getItem("workerObject") !== null) {
      user = JSON.parse(localStorage.getItem("workerObject"));
      accountType = "Worker";
      serviceValue = user["service"]["service"];
    } else if (localStorage.getItem("adminObject") !== null) {
      user = JSON.parse(localStorage.getItem("adminObject"));
      accountType = "Admin";
    }

    //set state with current user

   if (user != null) {
      this.state = {
        profile: user,
        type: accountType,
        loaded: false,
        editStatus: false,
        service: serviceValue,
        services: null,
        email: user["user"]["username"],
        firstName: user["user"]["firstName"],
        lastName: user["user"]["lastName"],
        address: user["user"]["address"],
      };
    } else {
      this.state = {
        profile: user,
        type: accountType,
        loaded: false,
        editStatus: false,
        service: serviceValue,
        services: null,
      };
      
    }
    
    this.setEditTrue = this.setEditTrue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var account;
    if (localStorage.getItem("customerObject") !== null) {
      account = JSON.parse(localStorage.getItem("customerObject"));
    } else if (localStorage.getItem("workerObject") !== null) {
      account = JSON.parse(localStorage.getItem("workerObject"));
    } else if (localStorage.getItem("adminObject") !== null) {
      account = JSON.parse(localStorage.getItem("adminObject"));
    }

    account["user"]["username"] = this.state.email;
    account["user"]["firstName"] = this.state.firstName;
    account["user"]["lastName"] = this.state.lastName;
    account["user"]["address"] = this.state.address;



    this.props.updateAccount(account, this.state.type, true,this.props.history);

    this.setState({ editStatus: false });
  }

  setEditTrue() {
    this.setState({ editStatus: true });
  }

  async componentDidMount() {
    try {
      const res = await axios.get("http://localhost:8080/api/service/all");
      this.setState({ services: res.data, loaded: true });
      console.log(res.data);
    } catch (err) {
      if (err.response.status === 404) {
        this.setState({ loaded: true });
      }
    }
  }

  render() {
    //used to render only after workers have been grabbed
    if (!this.state.loaded) {
      return (
        <div className="center-align">
          <div className="progress" data-test="progress-bar">
            <div className="indeterminate"></div>
          </div>
        </div>
      );
    }

    //render page used to edit
    if (this.state.editStatus) {
      return (
        <div>
          <Navbar />
          <div className="row">
            <div className="account-card" data-test="editing-account-card">
              <div className="col s6 push-s3">
                <div className="card">
                  <div className="card-action blue darken-4 white-text center-align">
                    <h4>
                      <b>Account Overview</b>
                    </h4>
                  </div>
                  <div class="row">
                    <div className="card-content" data-test="edit-profile-header">
                      <div className="col s3">
                        <h6>
                          <b>Edit Profile</b>
                        </h6>
                      </div>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                      <div className="card-content" data-test="edit-email">
                        <h6> Edit Email</h6>
                        <div data-test="email-field">
                          <input
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                          ></input>
                          <span
                            className="helper-text"
                            data-error="This email is invalid. Please make sure it's formatted like example@email.com"
                            data-success=""
                          ></span>
                        </div>
                      </div>

                      <div className="card-content" data-test="edit-first-name">
                        <h6>Edit First Name</h6>
                        <div data-test="first-name-field">
                          <input
                            placeholder="Enter your First Name."
                            type="text"
                            className="validate"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                          ></input>
                        </div>
                      </div>

                      <div className="card-content" data-test="edit-last-name">
                        <h6>Edit Last Name</h6>
                        <div data-test="last-name-field">
                          <input
                            placeholder="Enter your last name."
                            type="text"
                            name="lastName"
                            value={this.state.lastName}
                            className="validate"
                            onChange={this.handleChange}
                          ></input>
                        </div>
                      </div>

                      <div className="card-content" data-test="edit-address">
                        <h6> Edit Address</h6>
                        <div data-test="address-field">
                          <input
                            placeholder="Enter Address."
                            type="text"
                            className="validate"
                            name="address"
                            value={this.state.address}
                            onChange={this.handleChange}
                          ></input>
                        </div>
                      </div>

                      <div className="card-content" data-test="save-profile-button">
                        <button
                          className="btn btn-profile blue darken-4"
                          type="submit"
                        >
                          Save Profile
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    //render page used to display information
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="account-card" data-test="viewing-account-card">
            <div className="col s6 push-s3">
              <div className="card" data-test="card">
                <div className="card-action blue darken-4 white-text center-align">
                  <h4>
                    <b>Account Overview</b>
                  </h4>
                </div>
                <div class="row">
                  <div className="card-content" data-test="profile-heading">
                    <div className="col s3">
                      <h6>
                        <b>Profile</b>
                      </h6>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="col s3">
                      <h7>Email</h7>
                    </div>
                    <div className="col s3 push-s3" data-test="email">
                      <h7>
                        <b>{this.state.profile["user"]["username"]}</b>
                      </h7>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="col s3">
                      <h7>Full Name</h7>
                    </div>
                    <div className="col s3 push-s3" data-test="fullname">
                      <h7>
                        <b>
                          {this.state.profile["user"]["firstName"]}{" "}
                          {this.state.profile["user"]["lastName"]}
                        </b>
                      </h7>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="col s3">
                      <h7>Address</h7>
                    </div>
                    <div className="col s3 push-s3" data-test="address">
                      <h7>
                        <b>{this.state.profile["user"]["address"]}</b>
                      </h7>
                    </div>
                  </div>

                  <div className="card-content">
                    <div className="col s3">
                      {/*this.state.type !== "Worker" ? null : <h7>Service</h7>*/}
                    </div>
                    <div className="col s3 push-s3">
                      <h7>
                        {/*this.state.type !== "Worker" ? null : (
                          <b>{this.state.profile["service"]["service"]}</b>
                        )*/}
                      </h7>
                    </div>
                  </div>
                  <div className="card-content" data-test="edit-profile-button">
                    <button
                      className="btn btn-profile blue darken-4"
                      type="submit"
                      onClick={this.setEditTrue}
                    >
                      Edit Profile
                    </button>
                  </div>
                  <div className="card-content"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Account.propTypes = {
  updateAccount: PropTypes.func.isRequired,
};

export default connect(null, { updateAccount })(Account);
