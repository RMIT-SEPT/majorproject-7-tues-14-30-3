import React, { Component } from "react";

export default class DayButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blue: false,
      time: "",
      clicked: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({blue: !this.state.blue})
    this.setState({clicked: !this.state.clicked})
    this.setState({timeValue: this.props.timeValue})
    console.log(this.props.timeValue)
    console.log(this.state.clicked.toString())
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
