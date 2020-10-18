import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class LoggedOutDashboard extends Component {
  render() {
    return (
      <div className="loggedOutComponent" data-test="logged-out-dashboard">
        <div className="container">
          <div className="row">
            <div className="col s12 center-align">
              <div className="dashboard-main-text">
                <b>Quality services provided</b>
              </div>
              <div className="dashboard-sub-text">
                <h5>
                  <b>Dedicated workers.  </b>
                </h5>
              </div>
              <div className="signupbtn" data-test="sign-up-btn">
                <Link to="/CustomerSignUp">
                  <button
                    className="btn dashboard-signup blue darken-4"
                    data-test="sign-up-button"
                    type="submit"
                  >
                    Get Agme today
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
