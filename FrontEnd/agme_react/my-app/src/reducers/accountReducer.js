import { GET_ACCOUNTS, GET_ACCOUNT } from "../actions/types";

const initialState = {

 accounts:[],
 account:{}

};

const booleanActionPayload = payload => {

  if(payload){
    return true;
  } else {
    return false;
  }


};


export default function (state = initialState, action) {
  switch(action.type) {
    case GET_ACCOUNTS:
      return{
        ...state,
        accounts:action.payload

      };

      case GET_ACCOUNT:
        return{
          ...state,
          account:action.payload
  
        };

      default:
        return state;
  }
}