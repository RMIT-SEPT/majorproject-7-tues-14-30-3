import { combineReducers, createStore } from "redux";
import errorReducer from "./errorReducer";
import loggedInReducer from './loggedInReducer';
import currentReducer from './currentUser';
import messageReducer from './errorMessage';
import accountReducer from "./accountReducer";
import securityReducer from "./securityReducer";
import clickedReducer from "./clickedBookingReducer";

const rootReducer = combineReducers({
  errors: errorReducer,
  loggedIn: loggedInReducer,
  currentUser:currentReducer,
  message:messageReducer,
  account:accountReducer,
  security:securityReducer,
  clicked:clickedReducer
})

export default rootReducer
