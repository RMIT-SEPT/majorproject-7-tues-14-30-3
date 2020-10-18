import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/securityActions";

export class CustomerLogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false
    };
    
  
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });

  }

  handleSubmit(e) {
    e.preventDefault();
    const newResponse = {
      username : this.state.email,
      password : this.state.password
    }
    
    //grab account using email and password, will only work if details are correct
    this.props.login(newResponse, this.props.history);

    //set error state to true to display error message, will only work is login fails
    this.setState({ error:true});
  }


  render() {

    return (
      
      <div>
        <div className="row">
          <div className="col s12 m4 offset-m4">
            <div className="card" data-test="card">
              <div className="card-action blue darken-4 white-text"
              >
                <Link to="/Dashboard">
                  <span className="white-text text-darken-2 center-align">
                    <h2 data-test="header">Agme Booking</h2>
                  </span>
                </Link>
              </div>

              <div className="card-content">

              {/* will display error message if login fails */}
                {
                   (this.state.error === false) ? null: (
                     (this.props.message === null) ? null :(
                    <div className="card-action red darken-4 white-text">
                    <div className="white-text  text-darken-2 center-align">
                     <h5>Sorry, Wrong {this.props.message}</h5>
                     </div>
                    </div>
                     ))
                }
              
              </div>


              <form onSubmit={this.handleSubmit}>
                <div className="card-content">
                  <div data-test="email-field">
                    <input
                    field="identifier"
                    placeholder="Please enter your email."
                    name="email"
                    type="email"
                    value= {this.state.email}
                    onChange={this.handleChange}
                    ></input>
                    <span
                      className="helper-text"
                      data-error="Please enter your email address or username."
                      data-success=""
                    ></span>
                  </div>
                </div>
                <div className="card-content">
                  <div data-test="password-field">
                    <input
                      field="password"
                      placeholder="Please enter your password."
                      id="password"
                      name="password"
                      value= {this.state.password}
                      onChange={this.handleChange}
                      type="password"
                    ></input>
                    <span
                      className="helper-text"
                      data-error="Please enter your password."
                      data-success=""
                    ></span>
                  </div>
                </div>
                <div className="center-align">
                  <button
                    className="btn btn-form blue darken-4"
                    data-test="log-in-button"
                    type="submit"
                  >
                    Log In
                  </button>
                </div>              
              </form>
              
              <div className="card-content center-align">
                <h8>
                  <b>Don't have an account?</b>
                </h8>
                <div className="form-field"></div>
              </div>
              
              <div className="card-content">
                <div className="center-align">
                  <a
                    className="btn btn-block blue-grey lighten-5 blue-text"
                    data-test="signUpButton"
                    type="submit"
                  >
                    <Link to="/CustomerSignUp">Sign Up for Agme</Link>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CustomerLogIn.propTypes = {
  login: PropTypes.func.isRequired
};

//used to grab errors stored in the store.
const stateToProps = (state) =>{
  return {
    message:state.message
  }
}

export default connect (
  stateToProps,
  {login}
)(CustomerLogIn);