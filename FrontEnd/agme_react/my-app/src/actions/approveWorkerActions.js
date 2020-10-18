import axios from "axios";
import { GET_ERRORS } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";

export const approveWorker = (workId, history) => async dispatch => {
  
  setJWTToken(localStorage.getItem('jwtToken'))
  try {
      //used to send authenticate api in order to authenticate a worker

        const  res1 = await axios.patch("http://localhost:8080/api/worker/authenticate", null,{ params: { workerId :
        workId}
        } );

    
    history.push("/WorkerConfirmation");
    history.go(0);
  } catch (err) {
    console.log(err)
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
