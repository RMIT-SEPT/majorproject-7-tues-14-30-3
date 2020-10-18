import { ERR_MESSAGE } from  "../actions/types";

const initialState = null;

//used to store error state of login function in case of wrong email or password
export default function (state = initialState, action) {
  switch (action.type) {
    case ERR_MESSAGE:
      return action.payload;
    default:
      return state;
  }
}