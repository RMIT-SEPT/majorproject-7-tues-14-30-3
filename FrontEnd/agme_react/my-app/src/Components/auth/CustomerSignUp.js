import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createAccount } from "../../actions/securityActions";
import axios from "axios";

export class CustomerSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      type:"",
      service:"",
      confirmPassword:"",
      services:null,
      loaded:false

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();


    const newAccount = {
      username: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      role:this.state.type,
      confirmPassword:this.state.confirmPassword
    }
    console.log(newAccount)

    //method used to create account with specified type. Will be successful if details are valid

      this.props.createAccount(newAccount, this.state.service, this.state.type, this.props.history);
    


  }


  async componentDidMount() {

    try{
    const res = await axios.get("http://localhost:8080/api/service/all");
    this.setState({ services: res.data, loaded: true });
    console.log(res.data)
    }    catch (err) {  


    if(err.response.status === 404){
      this.setState({ loaded: true });

  }
  }
  }



  render() {
  //used to render only after information has been loaded from backend
  if (!this.state.loaded) {
    return (
      <div className = "center-align">
              <div className="progress">
              <div className="indeterminate"></div>
          </div>
          </div>
      
            );
}


    return (
      <div>
        <div className="row">
          <div className="col s12 m4 offset-m4">
            <div className="card" data-test="card">
              <div className="card-action blue darken-4 white-text">
                <Link to="/Dashboard">
                  <span className="white-text text-darken-2 center-align" data-test="header">
                    <h2>Agme Booking</h2>
                  </span>
                </Link>
              </div>
              <form onSubmit={this.handleSubmit}>
              <div className="card-content">
                <h6> What's your email?</h6>
                <div data-test="email-field">
                  <input
                    placeholder="Enter your email."
                    type="email"
                    name="email"
                    value= {this.state.email}
                    onChange={this.handleChange}
                  ></input>
                  <span
                    className="helper-text"
                    data-error="This email is invalid. Please make sure it's formatted like example@email.com"
                    data-success=""
                  ></span>
                </div>
              </div>
              <div className="card-content">
                <h6> Confirm your email</h6>
                <div data-test="confirm-email-field">
                  <input
                    placeholder="Enter your email again."
                    type="email"
                    className="validate"
                  ></input>
                  <span
                    className="helper-text"
                    data-error="This email is invalid. Please make sure it's formatted like example@email.com"
                    data-success=""
                  ></span>
                </div>
              </div>
              <div className="card-content">
                <h6> Create a password</h6>
                <div data-test="password-field">
                  <input
                    placeholder="Create a password."
                    type="password"
                    className="validate"
                    name="password"
                    value= {this.state.password}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <div className="card-content">
                <h6> Confirm your password</h6>
                <div data-test="confirm-password-field">
                  <input
                    placeholder="Enter your password again."
                    type="password"
                    className="validate"
                    name="confirmPassword"
                    value= {this.state.confirmPassword}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>


              <div className="card-content">
                <h6> What's your First Name?</h6>
                <div data-test="first-name-field">
                  <input
                    placeholder="Enter your First Name."
                    type="text"
                    className="validate"
                    name = "firstName"
                    value= {this.state.firstName}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>

              <div className="card-content">
                <h6> What's your Last Name?</h6>
                <div data-test="last-name-field">
                  <input
                    placeholder="Enter your last name."
                    type="text"
                    name = "lastName"
                    value= {this.state.lastName}
                    className="validate"
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>

              <div className="card-content">
                <h6> What's your address?</h6>
                <div data-test="address-field">
                  <input
                    placeholder="Enter Address."
                    type="text"
                    className="validate"
                    name = "address"
                    value= {this.state.address}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>

              <div className="card-content">
              <h6> Are you a Customer or a Worker? </h6>
              <select className = "browser-default" onChange={this.handleChange} 
              value= {this.state.type} 
              name = "type" required >
                      <option value="" disabled selected>Select account type</option>
                      <option value="CUSTOMER">Customer</option>
                      <option value="WORKER">Worker</option>
                  </select>
                  
              </div>

              <div className="card-content">


              {(this.state.type !== "WORKER") ? null: 
                <h6> Select Service </h6>
              }
              {
                
                
                
                (this.state.type !== "WORKER") ? null: 
              
              <select className = "browser-default" onChange={this.handleChange} 
              value= {this.state.service} 
              name = "service">
              <option value = "" disabled selected>Choose your option</option>
              {
                
                this.state.services.map((service, index) => (
                  <option key={index} value={service['service']}> {service['service']} </option>
                ))
              }
                  </select> 

   
                
              }
              </div>


              <div className="center-align">
                <button className="btn btn-form blue darken-4" 
                data-test="sign-up-button"
                type="submit">
                  Sign Up
                </button>
              </div>

              <div className="card-content center-align">
                <h6> Have an account?</h6>
                <Link to="/CustomerLogIn">
                  <h6>
                    <u> Log In.</u>
                  </h6>
                </Link>
                <div className="form-field"></div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CustomerSignUp.propTypes = {
  createAccount: PropTypes.func.isRequired,
};


export default connect (
  null,
  {createAccount}
)(CustomerSignUp);