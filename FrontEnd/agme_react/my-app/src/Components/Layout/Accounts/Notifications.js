import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "../Navbars/MainNavbar/MainNavbar";

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    var notifs = [];
    var user;


    //checks what kind of user is logged in and saves the user into the user variable
    //while also setting accountType appropriately

    if (localStorage.getItem("workerNotifs") !== null) {
      notifs = JSON.parse(localStorage.getItem("workerNotifs"));

    } else  if (localStorage.getItem("custNotifs") !== null) {
      notifs = JSON.parse(localStorage.getItem("custNotifs"));

    }

    if (localStorage.getItem("workerObject") !== null) {
      user = JSON.parse(localStorage.getItem("workerObject"));

    } else  if (localStorage.getItem("customerObject") !== null) {
      user = JSON.parse(localStorage.getItem("customerObject"));

    } 

    console.log(notifs)

      this.state = {
        notifications: notifs,
        profile:user
      };

      

  }

  render() {
    var notifArray = this.state.notifications;
    localStorage.removeItem("workerNotifs");



    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="notif-card">
            <div className="col s6 push-s3">
              <div className="card">
                <div className="card-action blue darken-4 white-text center-align">
                  <h4>
                    <b>Notifications</b>
                  </h4>
                </div>
                <div class="row">

  

                  <div className="card-content">
                  <div className="col s10 notifier">
                    <h5>
                      <b>Notifications</b>
                    </h5>
                    <h6>
                    <b>Name:</b>{" "}   {this.state.profile["user"]["firstName"]}{" "} {this.state.profile["user"]["lastName"]}
                    
                  </h6>
                      <br></br>
                    </div>
                   </div>

                  <div className="card-content">
                  <div className="col s10">
                    {
                        (notifArray.length === 0)?(
                          <div className="notifier">
                          <h6>
                          <b>You don't have any new notifications.</b></h6>
                          <br></br>
                          </div>

                        ) : notifArray.map((singleNotif,index)=>(

                      <div className="notifier">
                          <h6><b>Notification {index+1}: {singleNotif['name']} </b></h6>
                          <h6><b>Message: </b></h6> 
                          <h6>{singleNotif['message']}</h6>
                          <br></br>
                          </div>
                      
                        ))



                    }


                  </div>
                </div>

 
                  <div className="card-content"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    
  }
}

