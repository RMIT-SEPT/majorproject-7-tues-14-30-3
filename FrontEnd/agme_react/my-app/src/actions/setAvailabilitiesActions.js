import axios from "axios";
import { GET_ERRORS } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";

export const setAvailabilities = (setWorkerId,  setDay, times, history) => async dispatch => {
  

 
  try {
      //if account type is of Customer, a customer account is created, else a worker account is created
      setJWTToken(localStorage.getItem('jwtToken'))
        const  res1 = await axios.post("http://localhost:8080/api/worker/availability", times, { params: { workerId :
        setWorkerId, day : setDay}});


    
        history.push("/WorkerAvailabilities");
        history.go(0);
  } catch (err) {
    console.log(err)
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
