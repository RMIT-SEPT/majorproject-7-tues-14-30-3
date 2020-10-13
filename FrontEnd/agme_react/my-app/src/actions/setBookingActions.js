import axios from "axios";
import { GET_ERRORS, CLICKED } from "./types";

export const setBooking = (details) => async dispatch => {


  
  dispatch({ type: CLICKED, payload: details });

      //  history.push("/WorkerAvailabilities");
     

};
