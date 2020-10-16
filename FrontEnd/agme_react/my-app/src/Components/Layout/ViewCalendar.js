import React, { Component } from "react";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
import axios from "axios";
import setJWTToken from "../../securityUtils/setJWTToken";
import Navbar from './Navbars/MainNavbar/MainNavbar'

export default class ViewCalendar extends Component {
  constructor(props) {
    super(props);

    var user;
    var accountType;

    //checks what kind of user is logged in and saves the user into the user variable
    //while also setting accountType appropriately

    if (localStorage.getItem("customerObject") !== null) {
      user = JSON.parse(localStorage.getItem("customerObject"));
      accountType = "Customer";
    } else if (localStorage.getItem("workerObject") !== null) {
      user = JSON.parse(localStorage.getItem("workerObject"));
      accountType = "Worker";
    }

    this.state = {
      profile: user,
      loaded1: false,
      loaded2: false,
      account: accountType,
      localData: [],
    };
  }

  async componentDidMount() {
    setJWTToken(localStorage.getItem("jwtToken"));
    try {
      var data1;

      if (this.state.account === "Customer") {
        const res = await axios.get("http://localhost:8080/api/bookings/past", {
          params: { customerId: this.state.profile["id"] },
        });

        data1 = res.data;
      } else if (this.state.account === "Worker") {
        const res = await axios.get("http://localhost:8080/api/bookings/past", {
          params: { workerId: this.state.profile["id"] },
        });

        data1 = res.data;
      }
      // var data2 = res2.data;

      if (data1.length !== 0) {
        var startTime;
        var endTime;

        data1.forEach((data) => {
          startTime = data["startTime"];
          endTime = data["endTime"];

          const bookObject = {
            Id: data["id"],
            Subject: data["service"]["service"],
            StartTime: new Date(
              startTime.substring(0, 4),
              startTime.substring(5, 7) - 1,
              startTime.substring(8, 10),
              startTime.substring(11, 13),
              startTime.substring(14, 16)
            ),
            EndTime: new Date(
              endTime.substring(0, 4),
              endTime.substring(5, 7) - 1,
              endTime.substring(8, 10),
              endTime.substring(11, 13),
              startTime.substring(14, 16)
            ),
          };
          this.state.localData.push(bookObject);
        });
      }

      this.setState({ loaded1: true });
    } catch (err) {
      console.log(err);
      if (err.response.status === 404) {
        this.setState({ loaded1: true });
      }
    }

    try {
      var data1;

      if (this.state.account === "Customer") {
        const res = await axios.get(
          "http://localhost:8080/api/bookings/upcoming",
          { params: { customerId: this.state.profile["id"] } }
        );

        data1 = res.data;
      } else if (this.state.account === "Worker") {
        const res = await axios.get(
          "http://localhost:8080/api/bookings/upcoming",
          { params: { workerId: this.state.profile["id"] } }
        );

        data1 = res.data;
      }

      if (data1.length !== 0) {
        var startTime;
        var endTime;

        data1.forEach((data) => {
          startTime = data["startTime"];
          endTime = data["endTime"];

          const bookObject = {
            Id: data["id"],
            Subject: data["service"]["service"],
            StartTime: new Date(
              startTime.substring(0, 4),
              startTime.substring(5, 7) - 1,
              startTime.substring(8, 10),
              startTime.substring(11, 13),
              startTime.substring(14, 16)
            ),
            EndTime: new Date(
              endTime.substring(0, 4),
              endTime.substring(5, 7) - 1,
              endTime.substring(8, 10),
              endTime.substring(11, 13),
              startTime.substring(14, 16)
            ),
          };
          if (data["cancelled"] == true) {
            bookObject.Subject = "Cancelled";
          }

          this.state.localData.push(bookObject);
        });
      }

      this.setState({ loaded2: true });
    } catch (err) {
      console.log(err);
      if (err.response.status === 404) {
        this.setState({ loaded2: true });
      }
    }
  }

  render() {
    if (!this.state.loaded1 || !this.state.loaded2) {
      return (
        <div className="center-align">
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        </div>
      );
    }

    return (
      <div>
      <Navbar />
      <div/>
      <div className="calender">
      <ScheduleComponent
        height="650px"
        readonly={true}
        currentView="Month"
        width="100%"
        eventSettings={{ dataSource: this.state.localData }}
      >
        {/*<ResourcesDirective>
  <ResourceDirective  option='Month'>
  
  </ResourceDirective>

  </ResourcesDirective>
  */}

        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
      </div>
      </div>
    );
  }
}
