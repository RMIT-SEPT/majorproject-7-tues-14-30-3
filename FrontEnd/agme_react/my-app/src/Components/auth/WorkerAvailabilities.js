import React, { Component } from "react";
import Navbar from "./../Layout/Navbars/MainNavbar/MainNavbar";
import Footer from "./../Layout/Footer/Footer";
import axios from "axios";
import setJWTToken from "../../securityUtils/setJWTToken";
import TimeButton from "./Buttons/TimeButton";

export default class WorkerAvailabilities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workers: null,
      loaded: false,
      worker: null,
      day: null,
      blue: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    console.log(this.state.workers[e.target.value]);
    this.setState({ worker: this.state.workers[e.target.value] });
  }

  handleDayChange(e) {
    this.setState({ day: [e.target.value] });
  }

  handleClick() {
    this.setState({ blue: !this.state.blue });
  }

  async componentDidMount() {
    //used to load information on all workers in database in order to give options to the customer
    //when choosing which worker they want to book

    //set loaded state to true if all workers have bee loaded or if no workers have been found
    //in order to render page

    setJWTToken(localStorage.getItem("jwtToken"));

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

    if (!this.state.loaded) {
      return (
        <div className="center-align">
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        </div>
      );
    }

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
                            Please Select a Worker to assign working times to
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
    return (
      <div>
        <Navbar />
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
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                      </select>
                    </div>
                    <h6>
                      <div className="center-align">
                        <b>Time Slot Availabilities</b>
                      </div>
                    </h6>
                    <div className="col s4 ">
                      <TimeButton time="9:00 AM" />
                      <TimeButton time="10:00 AM" />
                      <TimeButton time="11:00 AM" />
                      <TimeButton time="12:00 PM" />
                      <TimeButton time="1:00 PM" />
                      <TimeButton time="2:00 PM" />
                      <TimeButton time="3:00 PM" />
                      <TimeButton time="4:00 PM" />
                      <TimeButton time="5:00 PM" />
                    </div>
                    <div className="col s4 push-s2">
                    <TimeButton time="9:30 AM" />
                    <TimeButton time="10:30 AM" />
                    <TimeButton time="11:30 AM" />
                    <TimeButton time="12:30 PM" />
                    <TimeButton time="1:30 PM" />
                    <TimeButton time="2:30 PM" />
                    <TimeButton time="3:30 PM" />
                    <TimeButton time="4:30 PM" />
                    </div>
                  </div>
                </div>

                <div className="card-content">
                  <button className="btn blue darken-4" type="submit">
                    Set Available Times
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
