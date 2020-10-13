import axios from "axios";
import { GET_ERRORS } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";

export const createBooking = (booking, history) => async dispatch => {
  setJWTToken(localStorage.getItem('jwtToken'))
  try {
        //creates a booking based on the object provided
        const  res2 = await axios.post("http://localhost:8080/api/bookings", booking);
      
    
    history.push("/Dashboard");
    history.go(0);
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
