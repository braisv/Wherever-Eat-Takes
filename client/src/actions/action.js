import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_ERROR,
    FETCH_USER
  } from "./actionType";
  
  export function fetchDataRequest() {
    return {
      type: FETCH_DATA_REQUEST
    };
  }
  
  export function fetchDataSuccess(restaurant) {
    return {
      type: FETCH_DATA_SUCCESS,
      restaurant
    };
  }
  
  export function fetchDataError(error) {
    return {
      type: FETCH_DATA_ERROR,
      payload: { error }
    };
  }
  
  export function fetchUser(user) {
    return {
      type: FETCH_USER,
      user
    };
  }