import React, { Component } from "react";
import Navbar from "./../Layout/Navbars/MainNavbar/MainNavbar";
import Footer from "./../Layout/Footer/Footer";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAvailabilities } from "../../actions/setAvailabilitiesActions";
import setJWTToken from "../../securityUtils/setJWTToken";
import TimeButton from "./Buttons/TimeButton";

class WorkerAvailabilities extends Component {
  constructor(props) {
    super(props);

    var timeArr = [];
    this.state = {
      workers: null,
      loaded: false,
      worker: null,
      day: null,
      blue: false,
      time:null,
      timeStore: timeArr
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleTime = this.handleTime.bind(this);
  }

  handleChange(e) {
    console.log(this.state.workers[e.target.value]);
    this.setState({ worker: this.state.workers[e.target.value] });
  }

  handleTime(){

   // this.state.timeStore.push(this.props.clicked);


   if (this.props.clicked!== null){
    var clickCheck = this.props.clicked['click'];
    var booking = this.props.clicked['bookingTime'];
  if(this.state.timeStore.length === 0){
    if (clickCheck){
      this.state.timeStore.push(booking);
    }
  } else {
    if (clickCheck){
      var checked = true;

      this.state.timeStore.forEach((timer) => {
        if (timer === booking) {
          checked = false;
        } 
      });

      if (checked){
        this.state.timeStore.push(booking)
      }


    } else {
      var checked = true;
      var count = 0;
      

      this.state.timeStore.forEach((timer, index) => {
        if (timer === booking) {
          checked = false;
          count = index;
        } 
      });

      if (!checked){
        this.state.timeStore.splice(count,1);
 
      }


    }

  }

}

  }

  handleDayChange(e) {
    this.setState({ day: e.target.value });
  }

  handleClick() {
    this.setState({ blue: !this.state.blue });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleTime();
   // console.log(this.state.day)
  //  console.log(this.state.timeStore)
 
    this.props.setAvailabilities(this.state.worker['id'], this.state.day, this.state.timeStore, this.props.history);

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

                      {(this.state.workers === null) ? (
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

                    <div className ="form-field"  onClick={this.handleTime} >
                    <div className="col s4 " >
                      <TimeButton timeValue="09:00:00" time="9:00 AM"/>
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

                  { (this.state.day !==null)?
                  <button className="btn blue darken-4" type="submit" >
                    Set Available Times
                  </button>:
                  <button disabled={true} className="btn blue darken-4" type="submit">
                  Select a Day
                </button>
                  }
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
};

const stateToProps = (state) =>{
  return {
    clicked:state.clicked
  }
}

export default connect(stateToProps, { setAvailabilities })(WorkerAvailabilities);