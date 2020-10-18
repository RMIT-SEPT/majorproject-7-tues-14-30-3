import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createBooking } from "../../actions/bookingActions";
import { getTimes } from "../../actions/getTimesActions";
import axios from "axios";
import setJWTToken from "../../securityUtils/setJWTToken";

export class Booking extends Component {
  constructor(props) {
    super(props);

    var customerObj;

    //gets and stores customer object from local storage. Used to add Customer details into booking
    if (localStorage.getItem("customerObject") != null) {
      customerObj = JSON.parse(localStorage.getItem("customerObject"));
    }

    var arrayObj = [];
    var arrayObj2 = [];
    var arrayObj3 = [];

    this.state = {
      workers: null,
      worker: "",
      filteredWorkers: arrayObj,
      customer: customerObj,
      startDate: "",
      startTime: "",
      endTime: "",
      currDuration: "",
      thirty: true,
      sixty: true,
      ninety: true,
      oneTwenty: true,
      times: arrayObj2,
      service: null,
      services: null,
      sLoaded: false,
      loaded: false,
      //times:null,
      timesLoader: true,
      durations: arrayObj3,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setTimes = this.setTimes.bind(this);
    this.duration = this.duration.bind(this);
    this.findTimes = this.findTimes.bind(this);
  }

  //used to set times for the booking
  setTimes() {
    this.setState({ times: this.props.times, timesLoader: true });
  }

  //used to look at the worker availabilities and provide possible booking durations
  findTimes(time) {
    var defaultValue = ["30 Minutes", "30"];
    var hourValue1 = ["1 Hour", "60"];
    var hourValue2 = ["2 Hours", "120"];
    var minValue1 = ["1 Hr 30 Minutes", "90"];
    var hour = parseInt(time.substring(0, 2), 10);
    var mins = parseInt(time.substring(3, 5), 10);
    this.state.durations.length = 0;
    this.state.durations.push(defaultValue);

    var oneHour = hour + 1;
    var twoHour = hour + 2;
    var thirtyMin = mins + 30;
    var firstMin = mins.toString();
    var secondMin = thirtyMin.toString();

    if (mins === 0) {
      firstMin = "00";
    }

    if (thirtyMin === 60) {
      secondMin = "00";
    }

    var firstHour = oneHour.toString() + ":" + firstMin + ":00";
    var secondHour = twoHour.toString() + ":" + firstMin + ":00";
    var ninteyMins = oneHour.toString() + ":" + secondMin + ":00";

    var flag1 = false;
    var flag2 = false;

    this.props.times.forEach((time) => {
      if (!flag1) {
        if (time === firstHour) {
          this.state.durations.push(hourValue1);
          flag1 = true;
        }
      }
    });

    if (flag1) {
      this.props.times.forEach((time) => {
        if (time === ninteyMins) {
          this.state.durations.push(minValue1);
          flag2 = true;
        }
      });
    }

    if (flag1 && flag2) {
      this.props.times.forEach((time) => {
        if (time === secondHour) {
          this.state.durations.push(hourValue2);
        }
      });
    }
  }

  //used to set endtime which is sent to the booking creation based on duration
  //choice
  duration(time) {
    var hour = parseInt(this.state.startTime.substring(0, 2), 10);
    var mins = parseInt(this.state.startTime.substring(3, 5), 10);
    var minValueInt = mins + 30;
    var minValue = minValueInt.toString();
    var finalValue = "";

    if (minValueInt === 60) {
      hour = hour + 1;
      minValue = "00";
    }

    if (time === "30") {
      finalValue = hour.toString() + ":" + minValue + ":00";
    } else if (time === "60") {
      hour = hour + 1;
      finalValue = hour.toString() + ":" + mins.toString() + ":00";
    } else if (time === "90") {
      hour = hour + 1;
      finalValue = hour.toString() + ":" + minValue + ":00";
    } else if (time === "120") {
      hour = hour + 2;
      finalValue = hour.toString() + ":" + mins.toString() + ":00";
    }

    this.setState({ endTime: finalValue });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    if (e.target.name === "service") {
      var serviceName = e.target.value;

      this.state.filteredWorkers.length = 0;

      if (this.state.workers !== null) {
        console.log(this.state.workers);
        this.state.workers.forEach((worker) => {
          if (worker["service"]["service"] === serviceName) {
            console.log(worker);
            var hasWorker = false;
            this.state.filteredWorkers.forEach((filter) => {
              if (filter["id"] === worker["id"]) {
                hasWorker = true;
              }
            });

            if (!hasWorker) {
              this.state.filteredWorkers.push(worker);
            }
          }
        });
      }
    }

    if (e.target.name === "startDate") {
      if (this.state.worker !== "") {
        this.props.getTimes(
          this.state.workers[this.state.worker]["id"],
          e.target.value,
          this.props.history
        );
      } else {
        this.setState({ startDate: "" });
      }
    }

    if (e.target.name === "startTime") {
      this.findTimes(e.target.value);
    }

    if (e.target.name === "currDuration") {
      this.duration(e.target.value);
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    //formats dates into database friendly pattern
    var starting = this.state.startDate + " " + this.state.startTime;
    var ending = this.state.startDate + " " + this.state.endTime;

    const newBooking = {
      customer: this.state.customer,
      worker: this.state.workers[this.state.worker],
      startTime: starting,
      endTime: ending,
    };

    //creates a booking based on info provided in form
    this.props.createBooking(newBooking, this.props.history);
  }

  async componentDidMount() {
    try {
      const res = await axios.get("http://localhost:8080/api/service/all");
      this.setState({ services: res.data, sLoaded: true });
      console.log(res.data);
    } catch (err) {
      if (err.response.status === 404) {
        this.setState({ sLoaded: true });
      }
    }

    //used to load information on all workers in database in order to give options to the customer
    //when choosing which worker they want to book

    //set loaded state to true if all workers have bee loaded or if no workers have been found
    //in order to render page

    try {
      setJWTToken(localStorage.getItem("jwtToken"));
      const res = await axios.get("http://localhost:8080/api/worker/all");
      this.setState({ workers: res.data, loaded: true });
    } catch (err) {
      if (err.response.status === 404) {
        this.setState({ loaded: true });
      }
    }
  }

  render() {
    //used to render only after workers have been grabbed
    if (!this.state.loaded || !this.state.sLoaded) {
      return (
        <div className="center-align">
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        </div>
      );
    }
    return (
      <div data-test="booking-card">
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <div className="card">
              <div className="card-action blue darken-4 white-text">
                <Link to="/Dashboard">
                  <span className="white-text text-darken-2 center-align">
                    <h3>Book your appointment</h3>
                  </span>
                </Link>
              </div>

              {
                <form onSubmit={this.handleSubmit}>
                  <div
                    className="card-content"
                    data-test="booking-card-services"
                  >
                    <h6> Select a service</h6>
                    <div className="form-field">
                      <select
                        className="browser-default"
                        onChange={this.handleChange}
                        value={this.state.service}
                        name="service"
                      >
                        <option value="" disabled selected>
                          Choose your option
                        </option>
                        {this.state.services.map((service, index) => (
                          <option key={index} value={service["service"]}>
                            {" "}
                            {service["service"]}{" "}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="card-content" data-test="workers">
                    <h6> Select a worker</h6>
                    <div className="form-field">
                      {/* if workers exist, loop through each worker in the drop down menu for the form
                  if they dont exit, load message saying workers dont exist*/}
                      {this.state.workers === null ||
                      this.state.filteredWorkers.length === 0 ? (
                        <select className="browser-default" required>
                          <option value="" disabled selected>
                            No workers Available
                          </option>
                        </select>
                      ) : (
                        <select
                          className="browser-default"
                          name="worker"
                          value={this.state.worker}
                          onChange={this.handleChange}
                          required
                        >
                          <option value="" disabled selected>
                            Choose your option
                          </option>
                          {this.state.filteredWorkers.map((worker, index) => (
                            <option key={worker["id"]} value={index}>
                              {" "}
                              {worker["user"]["firstName"]}{" "}
                              {worker["user"]["lastName"]}
                            </option>
                          ))}
                        </select>
                      )}

                      {this.state.workers === null ? (
                        <h6>No workers available</h6>
                      ) : this.state.service === null ? (
                        <h6>Please select a service</h6>
                      ) : this.state.filteredWorkers.length === 0 ? (
                        <h6>No workers available for this service</h6>
                      ) : (
                        <br></br>
                      )}
                    </div>
                    <div className="link-redirect">
                      <Link to="/WorkerProfiles">
                        <h6>Get to know our workers</h6>
                      </Link>
                    </div>
                  </div>

                  <div className="card-content" data-test="date-picker">
                    <h6> Choose your availability</h6>
                    <div className="form-field">
                      <input
                        type="date"
                        className="datepicker"
                        name="startDate"
                        value={this.state.startDate}
                        onChange={this.handleChange}
                        required
                      ></input>
                      {this.state.worker !== "" ? null : (
                        <h6>Please select a worker</h6>
                      )}
                    </div>
                  </div>

                  <div className="card-content" data-test="start-time-picker">
                    <h6> Pick Start time </h6>

                    <div className="form-field">
                      {this.props.times === null ? (
                        this.state.startDate === "" ? (
                          <select className="browser-default" required>
                            <option value="" disabled selected>
                              Please Select a Day
                            </option>
                          </select>
                        ) : null
                      ) : this.props.times.length === 0 ? (
                        <select className="browser-default" required>
                          <option value="" disabled selected>
                            No available shifts on this day
                          </option>
                        </select>
                      ) : (
                        <select
                          className="browser-default"
                          name="startTime"
                          value={this.state.startTime}
                          onChange={this.handleChange}
                          required
                        >
                          <option value="" disabled selected>
                            Select Times
                          </option>
                          {this.props.times.map((time, index) => (
                            <option key={index} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>

                  <div className="card-content" data-test="end-time-picker">
                    <h6> Select booking duration </h6>
                    <div className="form-field">
                      {this.state.startTime === "" ? (
                        <select className="browser-default" required>
                          <option value="" disabled selected>
                            Please Select Time
                          </option>
                        </select>
                      ) : (
                        [
                          <select
                            className="browser-default"
                            name="currDuration"
                            value={this.state.currDuration}
                            onChange={this.handleChange}
                            required
                          >
                            <option value="" disabled selected>
                              Select Duration
                            </option>
                            {this.state.durations.map((times, index) => (
                              <option key={index} value={times["1"]}>
                                {times["0"]}
                              </option>
                            ))}
                          </select>,
                        ]
                      )}
                    </div>
                  </div>

                  <div className="col s12 m6 offset-m3" data-test="book-btn">
                    <button
                      className="btn btn-form blue darken-4"
                      type="submit"
                    >
                      Book
                    </button>
                  </div>

                  <div className="card-content center-align"></div>
                </form>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Booking.propTypes = {
  createBooking: PropTypes.func.isRequired,
  getTimes: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
  return {
    times: state.times,
  };
};

export default connect(stateToProps, { createBooking, getTimes })(Booking);
