import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './types'

export const loginUser = () => {
    return { 
        type: LOGIN_SUCCESS 
    };
  };
  
export const logoutUser = () => {
    return { 
        type: LOGOUT_SUCCESS 
    };
  };
