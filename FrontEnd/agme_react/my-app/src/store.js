import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { composeWithDevTools } from 'redux-devtools-extension';



const initalState = {};
const middleware = [thunk];

let store;

if (window.navigator.userAgent.includes("Chrome")) {
  store = createStore(
    rootReducer,
    initalState,
    composeWithDevTools(
      applyMiddleware(...middleware),
     
    )
  );
} else {
  store = createStore(
    rootReducer,
    initalState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}

//const store = createStore(rootReducer, applyMiddleware(logger))

export default store;



