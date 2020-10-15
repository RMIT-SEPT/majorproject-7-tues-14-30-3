import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode"; 
import setJWTToken from "../securityUtils/setJWTToken";

export const createAccount = (newAccount, services, type, history) => async dispatch => {
  try {
      //if account type is of Customer, a customer account is created, else a worker account is created
      
      const res = await axios.post("http://localhost:8080/api/users/register", newAccount);

      const test = {      username : newAccount['username'],
        password : newAccount['password']}
      const res1 = await axios.post("http://localhost:8080/api/users/login",  test);
      const { token } = res1.data;
  
      setJWTToken(token);

      if(type ==="CUSTOMER"){
      const res3 = await axios.post("http://localhost:8080/api/customer");
      } else if (type ==="WORKER"){

        const res4 = await axios.post("http://localhost:8080/api/worker", null , { params: { service :
        services}
  
      })
    }
      


    //  if(type === "Customer"){
   //     const  res1 = await axios.post("http://localhost:8080/api/customer", newAccount);
    //  } else if (type === "Worker"){
    //    const  res2 = await axios.post("http://localhost:8080/api/worker", newAccount, { params: { service :
    //    service}});
   //   }
    setJWTToken();
    history.push("/Dashboard");


  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

export const login = (LoginRequest, history) => async dispatch =>{
  try{
    console.log(LoginRequest)
    const res = await axios.post("http://localhost:8080/api/users/login",  LoginRequest);


    console.log(res)

    const { token } = res.data;

    console.log(token)

    localStorage.setItem("jwtToken", token);
    setJWTToken(token);
    const decoded = jwt_decode(token);



    try{
      const res2 = await axios.get("http://localhost:8080/api/customer")
    
     const data2 = res2.data;
     console.log(data2)
      localStorage.setItem('customerObject', JSON.stringify(data2));


    } catch (err) {  
 
       dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      }


      //try to grab the worker account. if it is not a worker account, object will be null
    try{
    const res3 = await axios.get("http://localhost:8080/api/worker")
      const data3 = res3.data;
 
    localStorage.setItem('workerObject', JSON.stringify(data3));


      try{
      const resnotifs = await axios.get("http://localhost:8080/api/notifications")
        const dataNotifs = resnotifs.data;
        console.log(resnotifs)
   
      localStorage.setItem('workerNotifs', JSON.stringify(dataNotifs));
  
      } 
        catch (err) {  
          
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
      }


    } 
      catch (err) {  
        
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
    }


    try{
      const res4 = await axios.get("http://localhost:8080/api/admin")
        const data4 = res4.data;
   
     localStorage.setItem('adminObject', JSON.stringify(data4));

      } 
       catch (err) {  
          
         dispatch({
          type: GET_ERRORS,
           payload: err.response.data
         });
}




    dispatch({

      type: SET_CURRENT_USER,
      payload:decoded
    });
    history.push("/Dashboard");

  } catch(err){
    dispatch({

      type:GET_ERRORS,
      payload:err.response.data

    });


  }

}

