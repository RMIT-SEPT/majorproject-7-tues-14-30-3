import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../actions/types";

const intialState = { isloggedIn: false };

const loggedInReducer = (state = intialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isloggedIn: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isloggedIn: false,
      };
    default: return state
  }
};

export default loggedInReducer;

