import { CLICKED } from "../actions/types";

const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case CLICKED:
      return action.payload;
    default:
      return state;
  }
}