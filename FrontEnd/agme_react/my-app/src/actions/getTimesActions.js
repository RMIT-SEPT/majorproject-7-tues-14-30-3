import axios from "axios";
import { GET_ERRORS, TIMES } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";

export const getTimes = (workerID, dateData, history) => async dispatch => {
 
 
  try {
    dispatch({ type: TIMES, payload: null });

   
    setJWTToken(localStorage.getItem('jwtToken'))
   
    //used to retrieve availabilites for a worker on a certain date

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