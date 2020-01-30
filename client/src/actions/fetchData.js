import axios from "axios";
import { fetchDataRequest, fetchDataSuccess, fetchDataError } from "./action";

export function fetchRestaurants() {
  return dispatch => {
    dispatch(fetchDataRequest());
    axios
      .get(`http://localhost:5000/restaurants/restaurants`)
      .then(response => {
          console.log("PETICION RESPONSE: ", response.data)
        dispatch(fetchDataSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchDataError(error));
      });
  };
}