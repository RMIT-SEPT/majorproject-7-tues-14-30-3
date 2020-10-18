import React, { Component } from "react";
import {setBooking} from "../../../actions/setBookingActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";


 class DayButton extends Component {
  constructor(props) {
    super(props);

 
    this.state = {
      blue: false,
      time: "",
      clicked: true

    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({blue: !this.state.blue})
    this.setState({clicked: !this.state.clicked})
    this.setState({timeValue: this.props.timeValue})

    const details = {bookingTime: this.props.timeValue, click:this.state.clicked}

      //adds time to an object when button is clicked and passed to availabilities
    this.props.setBooking(details);

  }

  render() {

    let btntimeslot = this.state.blue ? "btn btn-timeslot blue darken-4" : "btn btn-timeslot grey";

    return (
      <div>
        <button className={btntimeslot} onClick={this.handleClick}>
          {this.props.time}
        </button>
      </div>
    );
  }
}
setBooking.propTypes = {
  setBooking: PropTypes.func.isRequired,
};

export default connect(null, { setBooking })(DayButton);