import { TIMES } from "../actions/types";

const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case TIMES:
      return action.payload;
    default:
      return state;
  }
}