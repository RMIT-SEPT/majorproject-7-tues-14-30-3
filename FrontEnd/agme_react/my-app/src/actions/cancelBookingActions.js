import axios from "axios";
import { GET_ERRORS } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";

export const cancelBooking = (id, statevar, history) => async dispatch => {
  setJWTToken(localStorage.getItem('jwtToken'))
 
  try {

      //used to set booking to cancelled state
        const  res1 = await axios.patch("http://localhost:8080/api/bookings/cancel",null, { 
          params: { bookingId : id}

  
      });


        
        history.push("/CurrentBooking");
        history.go(0);

  } catch (err) {

    console.log(err)
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
