import React, { Component } from "react";

export default class TimeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blue: false,
      time: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({blue: !this.state.blue})
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
