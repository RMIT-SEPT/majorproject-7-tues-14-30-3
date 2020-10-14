import axios from "axios";
import { GET_ERRORS } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";

export const updateAccount = (newAccount,  type, accountPage,history) => async dispatch => {
  

 
  try {
      setJWTToken(localStorage.getItem('jwtToken'))
      if(type === "Customer"){
        const  res1 = await axios.put("http://localhost:8080/api/customer", newAccount);
        localStorage.setItem('customerObject', JSON.stringify(res1.data));
      } else if (type === "Worker"){
        const  res2 = await axios.put("http://localhost:8080/api/worker", newAccount);
        if(accountPage){
        localStorage.setItem('workerObject', JSON.stringify(res2.data));
        }
      }else if (type === "Admin"){
        const  res3 = await axios.put("http://localhost:8080/api/admin", newAccount);

        localStorage.setItem('adminObject', JSON.stringify(res3.data));
      }
      if(accountPage){
    
    history.push("/Dashboard");
      } else {
        history.push("/WorkerAvailabilities");
      }
  } catch (err) {
    console.log(err)
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
