import axios from "axios";
import { GET_ERRORS, TIMES } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";

export const getTimes = (workerID, dateData, history) => async dispatch => {
 
 
  try {
    dispatch({ type: TIMES, payload: null });

    //if account type is of Customer, a customer account is created, else a worker account is created
    setJWTToken(localStorage.getItem('jwtToken'))
   
      const  res1 = await axios.get("http://localhost:8080/api/worker/availability",  { params: { workerId :
      workerID, date: dateData}});

      
      

     dispatch({ type: TIMES, payload: res1.data });
     
  
      history.push("/Booking");
      
} catch (err) {
 
  console.log(err)
  dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  });
}

  


      //  history.push("/WorkerAvailabilities");
     

};