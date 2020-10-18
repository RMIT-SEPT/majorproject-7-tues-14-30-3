
import { CLICKED } from "./types";

export const setBooking = (details) => async dispatch => {


  
  dispatch({ type: CLICKED, payload: details });

      //  history.push("/WorkerAvailabilities");
     

};
