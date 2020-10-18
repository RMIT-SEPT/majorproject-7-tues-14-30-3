import React, { Component } from "react";
import Navbar from "./../Layout/Navbars/MainNavbar/MainNavbar";
import Footer from "./../Layout/Footer/Footer";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAvailabilities } from "../../actions/setAvailabilitiesActions";
import setJWTToken from "../../securityUtils/setJWTToken";
import TimeButton from "./Buttons/TimeButton";
import { updateAccount } from "../../actions/updateActions";

export class WorkerAvailabilities extends Component {
  constructor(props) {
    super(props);
    var user;
    if (localStorage.getItem("workerObject") !== null) {
      user = JSON.parse(localStorage.getItem("workerObject"));
    }

    var timeArr = [];
    var left = [];
    var right = [];
    this.state = {
      workers: null,
      loaded: false,
      wLoaded: false,
      sLoaded: false,
      worker: null,
      day: null,
      service: null,
      services: null,
      profile: user,
      availabilities: null,
      workerDay: null,
      blue: false,
      time: null,
      arrayOne: left,
      arrayTwo: right,
      timeStore: timeArr,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.updating = this.updating.bind(this);
  }

  handleChange(e) {
    if (e.target.name === "service") {
      this.setState({
        service: e.target.value,
      });
    }
    if (e.target.name === "index") {
      this.setState({
        worker: this.state.workers[e.target.value],
        service: this.state.workers[e.target.value]["service"]["service"],
      });
    }
  }

  updating() {
    var account;

    account = this.state.worker;
    account["service"]["service"] = this.state.service;
    this.props.updateAccount(account, "Worker", false, this.props.history);

    this.setState({ worker: account });
  }

  handleTime() {
    //used to handle creating an array of times to set availabilities when
    //buttons are clicked
    if (this.props.clicked !== null) {
      var clickCheck = this.props.clicked["click"];
      var booking = this.props.clicked["bookingTime"];
      if (this.state.timeStore.length === 0) {
        if (clickCheck) {
          this.state.timeStore.push(booking);
        }
      } else {
        var checked = true;

        if (clickCheck) {
          this.state.timeStore.forEach((timer) => {
            if (timer === booking) {
              checked = false;
            }
          });

          if (checked) {
            this.state.timeStore.push(booking);
          }
        } else {
          var count = 0;

          this.state.timeStore.forEach((timer, index) => {
            if (timer === booking) {
              checked = false;
              count = index;
            }
          });

          if (!checked) {
            this.state.timeStore.splice(count, 1);
          }
        }
      }
    }
  }

  handleDayChange(e) {
    //used to set day when choosing a working day, also used to populate two
    //arrays for workers if they're checking availabilities
    this.setState({ day: e.target.value });

    var dayIndex = parseInt(e.target.value, 10);
    dayIndex = dayIndex - 1;

    this.state.arrayOne.length = 0;
    this.state.arrayTwo.length = 0;

    if (this.state.availabilities !== null) {
      if (this.state.availabilities[dayIndex].length !== 0) {
        this.state.availabilities[dayIndex].forEach((times, index) => {
          if (index % 2 === 0) {
            var value = times.substring(0, 5);
            this.state.arrayOne.push(value);
          }
        });

        this.state.availabilities[dayIndex].forEach((times, index) => {
          if (index % 2 === 1) {
            var value = times.substring(0, 5);
            this.state.arrayTwo.push(value);
          }
        });
      }
    }
  }

  handleClick() {
    this.setState({ blue: !this.state.blue });
  }

  handleSubmit(e) {
    //submit for admin creating availabilities
    e.preventDefault();
    this.handleTime();

    this.props.setAvailabilities(
      this.state.worker["id"],
      this.state.day,
      this.state.timeStore,
      this.props.history
    );
  }

  async componentDidMount() {
    //used to grab information from backend and populate information

    setJWTToken(localStorage.getItem("jwtToken"));
    try {
      const res = await axios.get("http://localhost:8080/api/service/all");
      this.setState({ services: res.data, sLoaded: true });
      console.log(res.data);
    } catch (err) {
      if (err.response.status === 404) {
        this.setState({ sLoaded: true });
      }
    }

    if (localStorage.getItem("workerObject") != null) {
      try {
        console.log(this.state.profile);
        const res = await axios.get(
          "http://localhost:8080/api/worker/availability",
          { params: { workerId: this.state.profile["id"] } }
        );
        this.setState({ availabilities: res.data, wLoaded: true });
        console.log(res.data);
      } catch (err) {
        if (err.response.status === 404) {
          this.setState({ wLoaded: true });
        }
      }
    } else {
      this.setState({ wLoaded: true });
    }

    try {
      const res = await axios.get("http://localhost:8080/api/worker/all");
      this.setState({ workers: res.data, loaded: true });
      console.log(res.data);
    } catch (err) {
      if (err.response.status === 404) {
        this.setState({ loaded: true });
      }
    }
  }

  render() {
    let btntimeslot = this.state.blue
      ? "btn btn-timeslot blue darken-4"
      : "btn btn-timeslot grey";

    if (!this.state.loaded || !this.state.wLoaded || !this.state.sLoaded) {
      return (
        <div className="center-align">
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        </div>
      );
    }
    //render page for worker
    if (localStorage.getItem("workerObject") != null) {
      return (
        <div>
          <Navbar />
          <div className="row">
            <div className="account-card">
              <div className="col s6 push-s3">
                <div className="card" data-test="card">
                  <div className="card-action blue darken-4 white-text center-align">
                    <h4>
                      <b>Availabilities</b>
                    </h4>
                  </div>

                  <div class="row">
                    <div className="card-content">
                      <h6>
                        <b>Choose Day</b>
                      </h6>
                      <div className="form-field">
                        <select
                          className="browser-default"
                          name="index"
                          value={this.state.day}
                          onChange={this.handleDayChange}
                          required
                        >
                          <option value="" disabled selected>
                            Select your day
                          </option>
                          <option value="1">Monday</option>
                          <option value="2">Tuesday</option>
                          <option value="3">Wednesday</option>
                          <option value="4">Thursday</option>
                          <option value="5">Friday</option>
                        </select>
                      </div>
                      <h6>
                        <div className="center-align">
                          <b>Time Slot Availabilities</b>
                        </div>
                      </h6>

                      <div className="form-field center-align">
                        <div className="col s4 avail push-s1">
                          {this.state.day != null
                            ? this.state.arrayOne.length !== 0
                              ? this.state.arrayOne.map(
                                  (availability, index) => (
                                    <li key={index}>
                                      {""}
                                      {availability}
                                    </li>
                                  )
                                )
                              : null
                            : null}
                        </div>
                        <div className="col s4 avail push-s2">
                          {this.state.day != null
                            ? this.state.arrayTwo.length !== 0
                              ? this.state.arrayTwo.map(
                                  (availability, index) => (
                                    <li key={index}> {availability}</li>
                                  )
                                )
                              : null
                            : null}
                        </div>
                      </div>
                    </div>
                    <div className="center-align">
                      {this.state.day != null ? (
                        this.state.arrayOne.length !== 0 ? null : (
                          <h6>
                            <b>No Availabilities for this Day</b>
                          </h6>
                        )
                      ) : (
                        <h6>
                          <b>Please Select a Day</b>
                        </h6>
                      )}
                    </div>

                    <h6>
                      <b></b>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    //render page for admin when worker is not chosen
    if (this.state.worker === null) {
      return (
        <div>
          <Navbar />
          <Footer />
          <div className="row">
            <div className="account-card">
              <div className="col s6 push-s3">
                <div className="card" data-test="card">
                  <div className="card-action blue darken-4 white-text center-align">
                    <h4>
                      <b>Worker Availabilities</b>
                    </h4>
                  </div>

                  <div class="row">
                    <div className="card-content" data-test="workers">
                      <h6>
                        <b> Worker accounts</b>
                      </h6>
                      <div className="form-field">
                        {this.state.workers === null ? (
                          <select className="browser-default" required>
                            <option value="" disabled selected>
                              No workers Available
                            </option>
                          </select>
                        ) : (
                          <select
                            className="browser-default"
                            name="index"
                            value={this.state.index}
                            onChange={this.handleChange}
                            required
                          >
                            <option value="" disabled selected>
                              Select your worker
                            </option>
                            {this.state.workers.map((worker, index) => (
                              <option key={worker["id"]} value={index}>
                                {" "}
                                {worker["user"]["firstName"]}{" "}
                                {worker["user"]["lastName"]}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>

                      <div className="card-content">
                        {this.state.workers === null ? (
                          <h6>No workers left to approve</h6>
                        ) : (
                          <h6>
                            Please Select a Worker to assign working times
                          </h6>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    //render page after worker chosen for admin
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="account-card" data-test="account-card">
            <div className="col s6 push-s3">
              <div className="card">
                <div className="card-action blue darken-4 white-text center-align">
                  <h4>
                    <b>Worker Availabilities</b>
                  </h4>
                </div>

                <div class="row">
                  <div className="card-content" data-test="workers">
                    <h6>
                      <b> Worker accounts</b>
                    </h6>

                    <div className="form-field">
                      {this.state.workers === null ? (
                        <select className="browser-default" required>
                          <option value="" disabled selected>
                            No workers Available
                          </option>
                        </select>
                      ) : (
                        <select
                          className="browser-default"
                          name="index"
                          value={this.state.worker}
                          onChange={this.handleChange}
                          required
                        >
                          <option value="" disabled selected>
                            Select your worker
                          </option>
                          {this.state.workers.map((worker, index) => (
                            <option key={worker["id"]} value={index}>
                              {" "}
                              {worker["user"]["firstName"]}{" "}
                              {worker["user"]["lastName"]}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    <div className="form-field">
                      <br></br>
                      <h6>
                        <b> Current Service :</b>{" "}
                        {this.state.worker["service"]["service"]}
                      </h6>
                      <br></br>

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
                      <br></br>
                    </div>
                    <div className="form-field">
                      <button
                        className="btn blue darken-4"
                        onClick={this.updating}
                      >
                        Update Service
                      </button>
                    </div>

                    <h6>
                      <b> Day</b>
                    </h6>
                    <div className="form-field">
                      <select
                        className="browser-default"
                        name="index"
                        value={this.state.day}
                        onChange={this.handleDayChange}
                        required
                      >
                        <option value="" disabled selected>
                          Select your day
                        </option>
                        <option value="1">Monday</option>
                        <option value="2">Tuesday</option>
                        <option value="3">Wednesday</option>
                        <option value="4">Thursday</option>
                        <option value="5">Friday</option>
                      </select>
                    </div>
                    <h6>
                      <div className="center-align">
                        <b>Time Slot Availabilities</b>
                      </div>
                    </h6>

                    <div className="form-field" onClick={this.handleTime}>
                      <div className="col s4 ">
                        <TimeButton timeValue="09:00:00" time="9:00 AM" />
                        <TimeButton timeValue="10:00:00" time="10:00 AM" />
                        <TimeButton timeValue="11:00:00" time="11:00 AM" />
                        <TimeButton timeValue="12:00:00" time="12:00 PM" />
                        <TimeButton timeValue="13:00:00" time="1:00 PM" />
                        <TimeButton timeValue="14:00:00" time="2:00 PM" />
                        <TimeButton timeValue="15:00:00" time="3:00 PM" />
                        <TimeButton timeValue="16:00:00" time="4:00 PM" />
                        <TimeButton timeValue="17:00:00" time="5:00 PM" />
                      </div>
                      <div className="col s4 push-s2">
                        <TimeButton timeValue="09:30:00" time="9:30 AM" />
                        <TimeButton timeValue="10:30:00" time="10:30 AM" />
                        <TimeButton timeValue="11:30:00" time="11:30 AM" />
                        <TimeButton timeValue="12:30:00" time="12:30 PM" />
                        <TimeButton timeValue="13:30:00" time="1:30 PM" />
                        <TimeButton timeValue="14:30:00" time="2:30 PM" />
                        <TimeButton timeValue="15:30:00" time="3:30 PM" />
                        <TimeButton timeValue="16:30:00" time="4:30 PM" />
                      </div>
                    </div>
                  </div>
                </div>
                {
                  <form onSubmit={this.handleSubmit}>
                    <div className="card-content">
                      {this.state.day !== null ? (
                        <button className="btn blue darken-4" type="submit">
                          Set Available Times
                        </button>
                      ) : (
                        <button
                          disabled={true}
                          className="btn blue darken-4"
                          type="submit"
                        >
                          Select a Day
                        </button>
                      )}
                    </div>
                  </form>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
setAvailabilities.propTypes = {
  setAvailabilities: PropTypes.func.isRequired,
  updateAccount: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
  return {
    clicked: state.clicked,
  };
};

export default connect(stateToProps, { setAvailabilities, updateAccount })(
  WorkerAvailabilities
);
