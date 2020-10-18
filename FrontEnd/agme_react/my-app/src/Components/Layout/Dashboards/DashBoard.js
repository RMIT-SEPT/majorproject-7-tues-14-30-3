import React, { Component } from "react";
import Navbar from "../Navbars/MainNavbar/MainNavbar";
import MainSideNavbar from "../Navbars/SideNavbar/SideNavbar";
import Footer from "../Footer/Footer";
import LoggedInDashboard from "./LoggedInDashboard";
import LoggedOutDashboard from "./LoggedOutDashboard";

export default class DashBoard extends Component {

  async componentDidMount() {
    const M = window.M;
    const sideNav = document.querySelector(".sidenav");
    M.Sidenav.init(sideNav, {});
  }
  
  render() {

    // assigning DashboardCard depending on whether user is logged in or not
    var DashboardCard;
    if (localStorage.getItem("workerObject") !== null || localStorage.getItem("customerObject") !== null || localStorage.getItem("adminObject") !== null) {
      DashboardCard = <LoggedInDashboard />;
    } else {
      DashboardCard = <LoggedOutDashboard />;
    }

    return (
      <div>
        <Navbar />
        <MainSideNavbar />
        {DashboardCard}
        <Footer />
      </div>
    );
  }
}
