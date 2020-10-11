import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createBooking } from "../../actions/bookingActions";
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

    this.state = {
      workers: null,
      worker: "",
      filteredWorkers: arrayObj,
      customer: customerObj,
      startDate: "",
      startTime: "",
      endTime: "",
      service: null,
      services: null,
      sLoaded: false,
      loaded: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "service") {
      var serviceName = e.target.value;

      this.state.filteredWorkers.length = 0;

      if (this.state.workers !== null) {
        this.state.workers.forEach((worker) => {
          if (worker["service"]["service"] === serviceName) {
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
  }

  handleSubmit(e) {
    e.preventDefault();

    //formats dates into database friendly pattern
    var starting = this.state.startDate + " " + this.state.startTime + ":00";
    var ending = this.state.startDate + " " + this.state.endTime + ":00";

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
      console.log("hi");
      setJWTToken(localStorage.getItem("jwtToken"));
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
                          {this.state.workers.map((worker, index) => (
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
                    </div>
                  </div>

                  <div className="card-content" data-test="start-time-picker">
                    <h6> Pick Start time </h6>
                    <div className="form-field">
                      <input
                        type="time"
                        className="timepicker"
                        name="startTime"
                        value={this.state.startTime}
                        onChange={this.handleChange}
                        required
                      ></input>
                    </div>
                  </div>

                  <div className="card-content" data-test="end-time-picker">
                    <h6> Pick End time </h6>
                    <div className="form-field">
                      <input
                        type="time"
                        className="timepicker"
                        name="endTime"
                        value={this.state.endTime}
                        onChange={this.handleChange}
                        required
                      ></input>
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
};

//const stateToProps = (state) =>{
// return {

// }
//}

export default connect(null, { createBooking })(Booking);
