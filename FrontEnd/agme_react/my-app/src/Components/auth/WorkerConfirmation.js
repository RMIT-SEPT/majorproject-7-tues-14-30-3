import React, { Component } from "react";
import Navbar from "./../Layout/Navbars/MainNavbar/MainNavbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { approveWorker} from "../../actions/approveWorkerActions";
import axios from "axios";
import setJWTToken from "../../securityUtils/setJWTToken";

 class WorkerConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workers: null,
      index: null,
      loaded: false,
      email:"",
      worker: null
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.approve = this.approve.bind(this);
  }

  handleChange(e) {
    console.log(this.state.workers[e.target.value])
    this.setState({ worker: this.state.workers[e.target.value] });

}

approve(){

this.props.approveWorker(this.state.worker['id'], this.props.history);

}


  async componentDidMount() {
    //used to load information on all workers in database in order to give options to the customer
    //when choosing which worker they want to book

    //set loaded state to true if all workers have bee loaded or if no workers have been found
    //in order to render page

    setJWTToken(localStorage.getItem('jwtToken'))

    try {
      const res = await axios.get(
        "http://localhost:8080/api/worker/all/authenticate"
        
      );
      this.setState({ workers: res.data, loaded: true });
      console.log(res.data);
    } catch (err) {
      if (err.response.status === 404) {
        this.setState({ loaded: true });
      }
    }
  }
  render() {
    if (!this.state.loaded) {
      return (
        <div className = "center-align">
                <div className="progress">
                <div className="indeterminate"></div>
            </div>
            </div>       
              );
    }

    if(this.state.worker === null){
      return (
        <div>
        <Navbar />
        <div className="row">
          <div className="account-card">
            <div className="col s6 push-s3">
              <div className="card" data-test="card">
                <div className="card-action blue darken-4 white-text center-align">
                  <h4>
                    <b>Worker confirmation</b>
                  </h4>
                </div>
                <div class="row">
                  <div className="card-content" data-test="workers">
                    <h6>
                      <b> Pending worker accounts</b>
                    </h6>
                    <div className="form-field">
                      {/* if workers exist, loop through each worker in the drop down menu for the form
                  if they dont exit, load message saying workers dont exist*/}
                  { (this.state.workers === null) ? (
                    <select  className = "browser-default"   required>
  
                    <option value = "" disabled selected>No workers Available</option>
                  
                </select>

                  ) :
                  <select  className = "browser-default" name = "index"
                  value = {this.state.index} onChange={this.handleChange}  required>

                        <option value = "" disabled selected>Choose your option</option>
                        {
                          
                          this.state.workers.map((worker, index) => (
                            <option key={worker['id']} value={index}> {worker['user']['firstName']} {worker['user']['lastName']}</option>
                          ))
                        }
                      
                    </select>
                      }
                    </div>

                    <div className="card-content">
                      
                    {
                      (this.state.workers === null)?
                      <h6>No workers left to approve</h6>:
                      <h6>Please Select a Worker to approve</h6>

                                         }                                
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
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
                    <b>Worker confirmation</b>
                  </h4>
                </div>
                <div class="row">
                  <div className="card-content" data-test="workers">
                    <h6>
                      <b> Pending worker accounts</b>
                    </h6>
                    <div className="form-field">
                      {/* if workers exist, loop through each worker in the drop down menu for the form
                  if they dont exit, load message saying workers dont exist*/}
                  { (this.state.workers === null) ? (
                    <h6> No workers available</h6>
                  ) :
                  <select  className = "browser-default" name = "index"
                  value = {this.state.index} onChange={this.handleChange}  required>

                        <option value = "" disabled selected>Choose your option</option>
                        {
                          
                          this.state.workers.map((worker, index) => (
                            <option key={worker['id']} value={index}> {worker['user']['firstName']} {worker['user']['lastName']}</option>
                          ))
                        }
                      
                    </select>
                      }
                    </div>

                    <div className="card-content">
                    <div className="col s3">
                    
                      <h6>
                        <b>Profile</b>
                      </h6>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="col s3">
                      <h7>Email</h7>
                    </div>
                    <div className="col s3 push-s3">
                      <h7>
                        <b>{this.state.worker["user"]["username"]}</b>
                      </h7>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="col s3">
                      <h7>Full Name</h7>
                    </div>
                    <div className="col s3 push-s3">
                      <h7>
                        <b>
                          {this.state.worker["user"]["firstName"]}{" "}
                          {this.state.worker["user"]["lastName"]}
                        </b>
                      </h7>

                    </div>
                  </div>
                  <div className="card-content">
                    <div className="col s3">
                      <h7>Address</h7>
                    </div>
                    <div className="col s3 push-s3">
                      <h7>
                        <b>{this.state.worker["user"]["address"]}</b>
                      </h7>
                    </div>
                  </div>

                  <div className="card-content">
                  <div className="col s3">
                  
                  <h7>Service</h7>
                
                    </div>

                
                  <div className="col s3 push-s3">
                  <h7>

         
                  <b>{this.state.worker["service"]["service"]}</b>
                
                    
                  </h7>
                  </div>
                </div>

                <div className="card-content">

                <button className="btn btn-profile blue darken-4" type="submit" onClick={this.approve} >
                Approve Worker
              </button>


              

              </div>
              <div className="card-content"></div>
              </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    );
  }
}
WorkerConfirmation.propTypes = {
  approveWorker: PropTypes.func.isRequired
};



export default connect (null, {approveWorker})(WorkerConfirmation);