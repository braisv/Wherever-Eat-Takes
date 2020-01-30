import { combineReducers } from "redux";
import products from "./reducers";
import authentication from "./auth-reducers";

export default combineReducers({
  authentication,
  products
});