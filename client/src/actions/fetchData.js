import axios from "axios";
import { fetchDataRequest, fetchDataSuccess, fetchDataError } from "./action";

export function fetchRestaurants() {
  return dispatch => {
    dispatch(fetchDataRequest());
    axios
      .get(`http://localhost:5000/restaurants/restaurants`)
      .then(response => {
        dispatch(fetchDataSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchDataError(error));
      });
  };
}