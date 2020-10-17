import axios from "axios";
//used to set token
const setJWTToken = token => {
  if (token){
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }


};
export default setJWTToken;