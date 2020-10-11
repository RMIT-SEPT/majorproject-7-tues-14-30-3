import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class LoggedInDashboard extends Component {
  render() {
    if (localStorage.getItem("adminObject") != null) {
      return (
        <div className="loggedInComponent">
          <div class="container">
            <div class="row">
              <div className="col l8 s12">
                <h5>
                  <b>Check your Bookings</b>
                </h5>

                <Link to="/CurrentBooking">
                  <button
                    className="btn btn-bookings blue darken-4"
                    data-test="sign-up-button"
                    type="submit"
                  >
                    Upcoming appointments
                  </button>
                </Link>

                <h6>
                  <b></b>
                </h6>

                <Link to="/PastBooking">
                  <button
                    className="btn btn-bookings blue darken-4"
                    data-test="sign-up-button"
                    type="submit"
                  >
                    Past Bookings
                  </button>
                </Link>
              </div>
              <div className="col l4 s12">
                <h5>
                  <b>Approve pending workers</b>
                </h5>

                <Link to="/WorkerConfirmation">
                  <button
                    className="btn blue btn-approve darken-4"
                    type="submit"
                  >
                    Approve workers
                  </button>
                </Link>
              </div>
              <div className="col l8 s12">
                <h5>
                  <b>Assign worker availabilites</b>
                </h5>
                <Link to="/WorkerAvailabilities">
                  <button
                    className="btn blue btn-approve darken-4"
                    type="submit"
                  >
                    Worker Availabilities
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    //if logged in user is worker, display this, else display customer version
    if (localStorage.getItem("workerObject") != null) {
      const worker = localStorage.getItem("workerObject");

      return (
        <div className="loggedInComponent">
          <div class="container">
            <div class="row">
              <div className="col l8 s12">
                <h5>
                  <b>Check your Bookings</b>
                </h5>
                {worker.accepted === false ? (
                  <h4>Approved</h4>
                ) : (
                  <h4>Not Approved</h4>
                )}

                <Link to="/CurrentBooking">
                  <button
                    className="btn btn-bookings blue darken-4"
                    data-test="sign-up-button"
                    type="submit"
                  >
                    Upcoming appointments
                  </button>
                </Link>

                <h6>
                  <b></b>
                </h6>

                <Link to="/PastBooking">
                  <button
                    className="btn btn-bookings blue darken-4"
                    data-test="sign-up-button"
                    type="submit"
                  >
                    Past Bookings
                  </button>
                </Link>
                
                <h6>
                <b></b>
              </h6>

                <Link to="/ViewCalendar">
                  <button
                    className="btn btn-bookings blue darken-4"
                    data-test="sign-up-button"
                    type="submit"
                  >
                    My calendar
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="loggedInComponent" data-test="logged-in-dashboard">
        <div className="container">
          <div className="row">
            <div className="col l7 s12">
              <div className="logged-in-dashboard-text">
                <h3>
                  <b>Looking to Book?</b>
                </h3>
                <h5>
                  <b>Start booking with the best services.</b>
                </h5>
              </div>
              <Link to="/Booking" data-test="book-btn">
                <button
                  className="btn btn-book blue darken-4"
                  data-test="sign-up-button"
                  type="submit"
                >
                  Book Now
                </button>
              </Link>
            </div>
            <div className="col l4 s12">
              <h5>
                <b>OR</b>
              </h5>
              <h5>
                <b>Already booked?</b>
              </h5>

              <Link to="/CurrentBooking">
                <button
                  className="btn btn-bookings blue darken-4"
                  data-test="sign-up-button"
                  type="submit"
                >
                  Upcoming appointments
                </button>
              </Link>

              <h6>
                <b></b>
              </h6>

              <Link to="/PastBooking">
                <button
                  className="btn btn-bookings blue darken-4"
                  data-test="sign-up-button"
                  type="submit"
                >
                  Past Bookings
                </button>
              </Link>

              <h6>
                <b></b>
              </h6>

                <Link to="/ViewCalendar">
                  <button
                    className="btn btn-bookings blue darken-4"
                    data-test="sign-up-button"
                    type="submit"
                  >
                    My calendar
                  </button>
                </Link>
                
            </div>
          </div>
        </div>
      </div>
    );
  }
}
