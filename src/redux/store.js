import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import { RestaurantDataReducer } from "../redux/reducers/RestaurantDataReducer";

const middleware = [thunk];
if (__DEV__) {
  middleware.push(createLogger());
}

const defaultState = {};

const appReducer = combineReducers({
  restauantDataReducer: RestaurantDataReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const store = createStore(
  rootReducer,
  defaultState,
  applyMiddleware(...middleware)
);

export default function getStore() {
  return store;
}
